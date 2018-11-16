import BannerPlugin from './banner'

export default function banner (options = {}) {
  const plugin = new BannerPlugin(options)
  return {
    name: 'banner',
    transformBundle (code) {
      return plugin.prependBanner(code)
    }
  }
}
