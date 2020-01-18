'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

function _typeof (obj) { if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

function _slicedToArray (arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest() }

function _nonIterableRest () { throw new TypeError('Invalid attempt to destructure non-iterable instance') }

function _iterableToArrayLimit (arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === '[object Arguments]')) { return } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break } } catch (err) { _d = true; _e = err } finally { try { if (!_n && _i['return'] != null) _i['return']() } finally { if (_d) throw _e } } return _arr }

function _arrayWithHoles (arr) { if (Array.isArray(arr)) return arr }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

var template = require('lodash.template')

var fs = require('fs')

var path = require('path')

var BannerPlugin =
/* #__PURE__ */
(function () {
  function BannerPlugin () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}

    _classCallCheck(this, BannerPlugin)

    this._options = options
    this._cwd = options.cwd || process.cwd()
    this._pkg = require(path.join(this._cwd, 'package.json'))
    this._symbol = null
  }

  _createClass(BannerPlugin, [{
    key: 'setStringContent',
    value: function setStringContent () {
      return this._options
    }
  }, {
    key: 'setObjectContent',
    value: function setObjectContent () {
      var _this$_options = this._options
      var file = _this$_options.file
      var encoding = _this$_options.encoding
      if (!file) return ''
      var filePath = path.resolve(file)
      var exits = fs.existsSync(filePath)

      if (exits) {
        return fs.readFileSync(filePath, encoding || 'utf-8')
      }
    }
  }, {
    key: 'setArrayContent',
    value: function setArrayContent () {
      var _this$_options2 = _slicedToArray(this._options, 2)
      var string = _this$_options2[0]
      var symbol = _this$_options2[1]

      this._symbol = symbol
      return string
    }
  }, {
    key: 'prependBanner',
    value: function prependBanner (code) {
      var _this = this

      var content = ''
      var res = code
      var setContent = {
        string: function string () {
          return _this.setStringContent()
        },
        object: function object () {
          return _this.setObjectContent()
        },
        array: function array () {
          return _this.setArrayContent()
        },
        'default': function _default () {
          return _this.setStringContent()
        }
      } // this._options = [" a \n a \n a", "//"];

      var isArray = Array.isArray(this._options)
      var paramType = isArray ? 'array' : _typeof(this._options)
      content = setContent[paramType]() // fix content

      if (content) {
        var tmpl = template(content)
        var text = ''
        var arr = tmpl({
          pkg: this._pkg
        }).split('\n')

        if (arr.length === 1) {
          text = '// ' + arr[0] + '\n'
        } else {
          var symbol = this._symbol

          for (var i = 0; i < arr.length; i++) {
            var item = arr[i]
            var line = ''
            var prefix = symbol || ' *'
            var suffix = '\n'

            if (i === 0) {
              prefix = symbol || '/**\n *'
              line = ''.concat(prefix, ' ').concat(item, ' ').concat(suffix)
              text += line
            } else if (i === arr.length - 1) {
              suffix = symbol ? '\n' : '\n */\n'
              line = ''.concat(prefix, ' ').concat(item, ' ').concat(suffix, '\n')
              text += line
            } else {
              line = ''.concat(prefix, ' ').concat(item, ' ').concat(suffix)
              text += line
            }
          }
        }

        res = text + code
      }

      return res
    }
  }])

  return BannerPlugin
}())

exports['default'] = BannerPlugin
