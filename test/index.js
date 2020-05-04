const expect = require('chai').expect
const { rollup } = require('rollup')
const { readFileSync: readFile } = require('fs')
const banner = require('../dist').default
const path = require('path')

describe('rollup-plugin-banner', () => {
  it('[input] string', async () => {
    let text = 'index.js by <%= pkg.author %>'
    const bundle = await rollup({
      input: 'test/fixtures/index.js',
      plugins: [ banner(text) ]
    })
    const { output } = await bundle.generate({ format: 'cjs' })
    expect(output[0].code).to.eql(
      "// index.js by yingye\n\'use strict\';\n\nwindow.test = true;\nconsole.log(\'hello rollup-plugin-banner\');\n"
    )
  })
  it('[input] string with line break', async () => {
    let text = 'index.js by <%= pkg.author %>\n\ntest line'
    const bundle = await rollup({
      input: 'test/fixtures/index.js',
      plugins: [ banner(text) ]
    })
    const { output } = await bundle.generate({ format: 'cjs' })
    expect(output[0].code).to.eql(
      "/**\n * index.js by yingye\n * \n * test line\n */\n\n'use strict';\n\nwindow.test = true;\nconsole.log('hello rollup-plugin-banner');\n"
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
    const { output } = await bundle.generate({ format: 'cjs' })
    expect(output[0].code).to.eql(
      "/**\n * index.js by yingye\n * \n * second line\n * third line\n * \n */\n\n\'use strict\';\n\nwindow.test = true;\nconsole.log(\'hello rollup-plugin-banner\');\n"
    )
  })
  it('[input] null', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/index.js',
      plugins: [ banner() ]
    })
    const { output } = await bundle.generate({ format: 'cjs' })
    expect(output[0].code).to.eql(
      "\'use strict\';\n\nwindow.test = true;\nconsole.log(\'hello rollup-plugin-banner\');\n"
    )
  })
  it('[input] string with raw', async () => {
    let text = '// index.js by <%= pkg.author %>'
    const bundle = await rollup({
      input: 'test/fixtures/index.js',
      plugins: [
        banner({
          text,
          raw: true
        })
      ]
    })
    const { output } = await bundle.generate({ format: 'cjs' })
    expect(output[0].code).to.eql(
      "// index.js by yingye\n\'use strict\';\n\nwindow.test = true;\nconsole.log(\'hello rollup-plugin-banner\');\n"
    )
  })
})
