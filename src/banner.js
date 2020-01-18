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
    if (typeof this._options === 'string') {
      content = this._options
    } else {
      const {
        file,
        encoding
      } = this._options
      if (!file) return code
      const filePath = path.resolve(file)
      const exits = fs.existsSync(filePath)
      if (exits) {
        content = fs.readFileSync(filePath, encoding || 'utf-8')
      }
    }

    // fix content
    if (content) {
      const tmpl = template(content)
      let text = ''
      let arr = tmpl({ pkg: this._pkg }).split('\n')
      if (arr.length === 1) {
        text = '// ' + arr[0] + '\n'
      } else {
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i]
          if (i === 0) {
            text += '// ' + item + '\n'
          } else if (i === arr.length - 1) {
            text += '// ' + item + '\n\n'
          } else {
            text += '// ' + item + '\n'
          }
        }
      }
      res = text + code
    }
    return res
  }
}
