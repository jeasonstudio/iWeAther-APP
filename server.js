process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'
const fs = require('fs')
const path = require('path')
const express = require('express')
const spdy = require('spdy')
const compression = require('compression')
const app = express()

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'
const ssl = process.env.SSL || 3001

const resolve = file=> path.resolve(__dirname, file)

const serve = (path, cache)=> express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use((req, res, next)=> {
    if (isProd && !req.secure && !process.env.NO_SSL) {
        let hostname = req.headers.host.replace(/:\d+$/, '')
        return res.redirect(301, `https://${hostname}:${ssl}${req.originalUrl}`)
    }
    return next()
})

app.use(compression({threshold: 0}))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/sw.js', serve('./dist/sw.js', true))

app.get('*', (req, res)=> {
    let template = resolve('./index.html')
    res.sendFile(template)
})

app.listen(port, host, (err)=> {
    if (err) {
        console.error(err)
        return process.exit(1)
    }
    console.log(`HTTP listening at: ${host}:${port}.`)
})

if (isProd && !process.env.NO_SSL) {
    const options = {
        key: fs.readFileSync(resolve(process.env.KEY || './private/server.key')),
        cert: fs.readFileSync(resolve(process.env.CERT || './private/server.crt')),
        ca: process.env.CA ? fs.readFileSync(resolve(process.env.CA)) : null
    }

    spdy.createServer(options, app).listen(ssl, host, (err)=> {
        if (err) {
            console.error(err)
            return process.exit(1)
        }
        console.log(`HTTPS listening at: ${host}:${ssl}.`)
    })
}