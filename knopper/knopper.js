/**
 * @file knopper.js bind logic to view
 * @author Jeason(me@jeasonstudio.cn)
 */

/**
 * Directive 初始化虚拟 DOM
 *
 * @param {any} el 
 * @param {any} knopper 
 * @param {any} attr 
 * @param {any} elementValue 
 */
function Directive(el, knopper, attr, elementValue) {
    this.el = el; // 绑定的 dom 节点
    this.knopper = knopper; // knopper实例
    this.attr = attr; // 元素的被绑定的属性值
    this.el[this.attr] = this.elementValue = elementValue; // init
}

/**
 * 用于构建 k-repeat 的虚拟 dom
 * 
 * @param {any} tagName 
 * @param {any} props 
 * @param {any} children 
 */
function ElementK(tagName, props, children) {
    this.tagName = tagName; // dom 的标签名
    this.props = props; // 属性对象
    this.children = children; // 子节点
}

ElementK.prototype.render = function () {
    var el = document.createElement(this.tagName) // 根据tagName构建
    var props = this.props

    // 设置节点的DOM属性 
    for (var propName in props) {
        var propValue = props[propName]
        el.setAttribute(propName, propValue)
    }

    var children = this.children || []

    children.forEach(function (child) {
        // 如果子节点也是虚拟DOM，递归构建DOM节点
        var childEl = (child instanceof Element) ? child.render() : document.createTextNode(child); // 如果字符串，只构建文本节点
        el.appendChild(childEl)
    })
    return el
}

/**
 * set 拦截器，对 data 中的赋值操作拦截
 * 
 * @param {any} target 
 * @param {any} key 
 * @param {any} value 
 * @param {any} receiver 
 * @returns 
 */
function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    var dataSet = receiver || target;
    // if (dataSet.__bindings[key] && isArray(dataSet.__bindings[key])) {
    //     debugger
    //     let _this = target.__bindings[key][1].knopper
    //     let node = target.__bindings[key][1].el
    //     let arr = target.__bindings[key]
    //     // renderRepeatList(node, arr, key, _this)
    // }
    dataSet.__bindings[key].forEach(item => {
        item.el[item.attr] = item.elementValue = value;
    });
    return result;
}

// 后插入函数
function appendAfter(flagDom, newDom) {
    // debugger
    if (flagDom.nextSibling) {
        //前插入子结点
        flagDom.parentNode.insertBefore(newDom, flagDom.nextSibling);
    } else {
        throw new Error('Here Should Have a comment')
    }
}

// 获取所有注释节点
function getCommentNodes(e) {
    let r = [],
        o, s;
    s = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, null, null);
    while (o = s.nextNode()) r.push(o);
    return r;
}

// 根据注释内容获取注释节点
function getTagCommentNode(commentText) {
    return getCommentNodes(document).find(item => item.data == commentText)
}

function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}

function renderRepeatList(oNode, arr, name, _this) {
    debugger
    let repeatStartComment = getTagCommentNode("K-REPEAT START WHERE THE ARRAY IS : " + name)
    let repeatEndComment = getTagCommentNode("K-REPEAT END WHERE THE ARRAY IS : " + name)
    let thisNode = repeatStartComment
    let virtualRepeatDom = []
    for (let index = 0; index < arr.length; index++) {
        appendAfter(thisNode, oNode.cloneNode(true))
        thisNode = thisNode.nextSibling
        // virtualRepeatDom.push(new ElementK())
    }
}

function kRepeat(node, _this) {
    var [attributeItem, attributeValue] = [...node.getAttribute('k-repeat').split(' in ')]
    if (!_this.data[attributeValue]) {
        throw new Error('Please input the right k-repeat')
    }
    // debugger
    _this[attributeValue] = new Proxy(_this._data[attributeValue], {
        set
    });

    node.removeAttribute('k-repeat')
    node.setAttribute('k-repeat-key', attributeItem)
    node.setAttribute('k-repeat-value', attributeValue)

    appendAfter(node, document.createComment("K-REPEAT END WHERE THE ARRAY IS : " + attributeValue))
    node.parentNode.replaceChild(document.createComment("K-REPEAT START WHERE THE ARRAY IS : " + attributeValue), node)
    // node.parentNode.insertBefore(document.createComment("K-REPEAT START WHERE THE ARRAY IS : " + attributeValue), node);

    console.log(node)
    renderRepeatList(node, _this.data[attributeValue], attributeValue, _this)
}

/**
 * 
 * 
 * @class Knopper 实例化类
 */
class Knopper {
    // 构造函数
    constructor(configs) {
        this.root = this.el = document.querySelector(configs.el);
        this._data = configs.data;
        this._data.__bindings = {};
        // 创建代理对象
        this.data = new Proxy(this._data, {
            set
        });
        this.methods = configs.methods;

        this._compile(this.root);
    }

    _compile(root) {
        var _this = this;

        var nodes = root.children;
        var bindDataTester = new RegExp('{{(.*?)}}', 'ig');

        for (let i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            // 如果还有 html 子节点，则递归
            if (node.children.length) {
                this._compile(node);
            }

            // 匹配双大括号            
            var matches = node.innerHTML.match(bindDataTester);
            if (matches) {
                var newMatches = matches.map(item => {
                    return item.replace(/{{(.*?)}}/, '$1');
                });
                var splitTextNodes = node.innerHTML.split(/{{.*?}}/);
                node.innerHTML = null;
                // 更新 DOM ，处理同一个 textnode 里面多次绑定情况
                if (splitTextNodes[0]) {
                    node.append(document.createTextNode(splitTextNodes[0]));
                }

                for (let ii = 0; ii < newMatches.length; ii++) {
                    var el = document.createTextNode('');
                    node.appendChild(el);
                    if (splitTextNodes[ii + 1]) {
                        node.append(document.createTextNode(splitTextNodes[ii + 1]));
                    }

                    let kaam = new Directive(el, this, 'nodeValue', this.data[newMatches[ii]])
                    // 对数据和dom进行绑定
                    // debugger
                    let returnCode = !this._data.__bindings[newMatches[ii]] ?
                        this._data.__bindings[newMatches[ii]] = [kaam] :
                        this._data.__bindings[newMatches[ii]].push(kaam);
                }
            }

            if (node.hasAttribute(('k-model')) && node.tagName.toLocaleUpperCase() == 'INPUT' || node.tagName.toLocaleUpperCase() == 'TEXTAREA') {
                node.addEventListener('input', (function () {

                    var attributeValue = node.getAttribute('k-model');

                    if (_this._data.__bindings[attributeValue]) {
                        _this._data.__bindings[attributeValue].push(new Directive(node, _this, 'value', _this.data[attributeValue]));
                    } else {
                        _this._data.__bindings[attributeValue] = [new Directive(node, _this, 'value', _this.data[attributeValue])];
                    }

                    return event => {
                        _this.data[attributeValue] = event.target.value;
                    };
                })());
            }

            if (node.hasAttribute('k-click')) {
                node.addEventListener('click', (function () {
                    var attributeValue = node.getAttribute('k-click');
                    var args = /\(.*\)/.exec(attributeValue);
                    // 允许参数
                    if (args) {
                        args = args[0];
                        attributeValue = attributeValue.replace(args, '');
                        args = args.replace(/[\(\)\'\"]/g, '').split(',');
                    } else {
                        args = [];
                    }
                    return event => {
                        _this.methods[attributeValue].apply(_this, [event, ...args]);
                    };
                })());
            }

            if (node.hasAttribute('k-repeat')) {
                kRepeat(node, _this)
            }

            console.log(_this)
        }
    }
}