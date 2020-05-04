const template = require('lodash.template')
const fs = require('fs')
const path = require('path')

export default class BannerPlugin {
  constructor (options = {}) {
    this._options = options
    this._cwd = options.cwd || process.cwd()
    this._pkg = require(path.join(this._cwd, 'package.json'))
  }
  prependBanner (code) {
    let content = ''
    let res = code
    let raw = false
    if (typeof this._options === 'string') {
      content = this._options
    } else {
      const {
        text = null,
        file,
        encoding
      } = this._options
      raw = this._options.raw || raw
      if (!file && !text) return code
      if (file) {
        const filePath = path.resolve(file)
        const exits = fs.existsSync(filePath)
        if (exits) {
          content = fs.readFileSync(filePath, encoding || 'utf-8')
        }
      } else {
        content = text
      }
    }

    // fix content
    if (content) {
      const tmpl = template(content)
      let text = ''
      if (raw) {
        text = tmpl({ pkg: this._pkg }) + '\n'
      } else {
        let arr = tmpl({ pkg: this._pkg }).split('\n')
        if (arr.length === 1) {
          text = '// ' + arr[0] + '\n'
        } else {
          for (let i = 0; i < arr.length; i++) {
            let item = arr[i]
            if (i === 0) {
              text += '/**\n * ' + item + '\n'
            } else if (i === arr.length - 1) {
              text += ' * ' + item + '\n */\n\n'
            } else {
              text += ' * ' + item + '\n'
            }
          }
        }
      }
      res = text + code
    }
    return res
  }
}
