const template = require('lodash.template')
const fs = require('fs')
const path = require('path')

export default class BannerPlugin {
  constructor (options = {}) {
    this._options = options
    this._cwd = options.cwd || process.cwd()
    this._pkg = require(path.join(this._cwd, 'package.json'))
    this._symbol = null
  }

  setStringContent () {
    return this._options
  }

  setObjectContent () {
    const { file, encoding } = this._options
    if (!file) return ''
    const filePath = path.resolve(file)
    const exits = fs.existsSync(filePath)
    if (exits) {
      return fs.readFileSync(filePath, encoding || 'utf-8')
    }
  }

  setArrayContent () {
    const [string, symbol] = this._options
    this._symbol = symbol

    return string
  }

  prependBanner (code) {
    let content = ''
    let res = code
    const setContent = {
      string: () => this.setStringContent(),
      object: () => this.setObjectContent(),
      array: () => this.setArrayContent()
    }

    const isArray = Array.isArray(this._options)
    const paramType = isArray ? 'array' : typeof this._options
    content = setContent[paramType]()

    // fix content
    if (content) {
      const tmpl = template(content)
      let text = ''
      let arr = tmpl({ pkg: this._pkg }).split('\n')
      if (arr.length === 1) {
        text = '// ' + arr[0] + '\n'
      } else {
        let symbol = this._symbol
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i]
          let line = ''
          let prefix = symbol || ' *'
          let suffix = '\n'
          if (i === 0) {
            prefix = symbol || '/**\n *'
            line = `${prefix} ${item} ${suffix}`
            text += line
          } else if (i === arr.length - 1) {
            suffix = symbol ? '\n' : '\n */\n'
            line = `${prefix} ${item} ${suffix}\n`
            text += line
          } else {
            line = `${prefix} ${item} ${suffix}`
            text += line
          }
        }
      }
      res = text + code
    }
    return res
  }
}
