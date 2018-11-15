const BannerPlugin = require('./banner')

module.exports = function banner (options = {}) {
  const plugin = new BannerPlugin(options)
  return {
    name: 'banner',
    renderChunk (code) {
      return plugin.prependBanner(code)
    }
  }
}
