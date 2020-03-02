const template = require('lodash.template')
const fs = require('fs')
const path = require('path')
const MagicString = require('magic-string')

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
            text += '/**\n * ' + item + '\n'
          } else if (i === arr.length - 1) {
            text += ' * ' + item + '\n */\n\n'
          } else {
            text += ' * ' + item + '\n'
          }
        }
      }
      res = this.createResultWithSourcemap(code, text)
    }
    return res
  }

  createResultWithSourcemap (code, banner) {
    const magicString = new MagicString(code)
    magicString.prepend(banner)

    // sourcemap generation inspired in https://github.com/jacksonrayhamilton/rollup-plugin-shift-header
    return {
      code: magicString.toString(),
      map: magicString.generateMap({ hires: true })
    }
  }
}
