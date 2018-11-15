// const BannerPlugin = require('./banner')
import BannerPlugin from './banner'

export default function banner (options = {}) {
  const plugin = new BannerPlugin(options)
  return {
    name: 'banner',
    renderChunk (code) {
      return plugin.prependBanner(code)
    }
  }
}
