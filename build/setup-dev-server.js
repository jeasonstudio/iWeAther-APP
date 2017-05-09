const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')

module.exports = function(app) {
    // setup on the fly compilation + hot-reload
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
    clientConfig.output.filename = '[name].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    })
    app.use(devMiddleware)

    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler))
}