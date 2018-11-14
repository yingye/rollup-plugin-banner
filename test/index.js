const expect = require('chai').expect
const { rollup } = require('rollup')
const { readFileSync: readFile } = require('fs')
const banner = require('../src')
const path = require('path')

describe('rollup-plugin-banner', () => {
  it('[input] string', async () => {
    let text = 'index.js by <%= pkg.author %>'
    const bundle = await rollup({
      input: 'test/fixtures/index.js',
      plugins: [ banner(text) ]
    })
    const result = await bundle.generate({ format: 'cjs' })
    expect(result.code).to.eql(
      "// index.js by yingye\n\'use strict\';\n\nwindow.test = true;\nconsole.log(\'hello rollup-plugin-banner\');\n"
    )
  })
  it('[input] obj', async () => {
    let obj = {
      file: path.resolve(__dirname, './fixtures/banner.txt')
    }
    const bundle = await rollup({
      input: 'test/fixtures/index.js',
      plugins: [ banner(obj) ]
    })
    const result = await bundle.generate({ format: 'cjs' })
    expect(result.code).to.eql(
      "// index.js by yingye\n\'use strict\';\n\nwindow.test = true;\nconsole.log(\'hello rollup-plugin-banner\');\n"
    )
  })
  it('[input] null', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/index.js',
      plugins: [ banner() ]
    })
    const result = await bundle.generate({ format: 'cjs' })
    expect(result.code).to.eql(
      "\'use strict\';\n\nwindow.test = true;\nconsole.log(\'hello rollup-plugin-banner\');\n"
    )
  })
})
