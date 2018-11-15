"use strict";

var BannerPlugin = require('./banner');

module.exports = function banner() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var plugin = new BannerPlugin(options);
  return {
    name: 'banner',
    renderChunk: function renderChunk(code) {
      return plugin.prependBanner(code);
    }
  };
};