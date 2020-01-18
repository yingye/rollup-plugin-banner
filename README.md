# rollup-plugin-banner

[![Build Status](https://travis-ci.org/yingye/rollup-plugin-banner.svg?branch=master)](https://travis-ci.org/yingye/rollup-plugin-banner)
[![npm version](https://badge.fury.io/js/rollup-plugin-banner.svg)](https://badge.fury.io/js/rollup-plugin-banner)
[![change-log](https://img.shields.io/badge/changelog-md-blue.svg)](https://github.com/yingye/rollup-plugin-banner/blob/master/CHANGELOG.md)

## Introduction

Rollup plugin to append content before js bundle.

The difference between this plugin and the output.banner parameter provided by the rollup is that the banner will not be cleaned up. For example, your project uses the rollup-plugin-uglify plugin, the output file will not contain the output.banner parameter you set. So you need rollup-plugin-banner to solve this problem.

## Usage

Install the plugin with NPM:

```
npm install --save-dev rollup-plugin-banner
```

Add it to your rollup configuration:

```js
import banner from 'rollup-plugin-banner'

export default {
  plugins: [
    banner('rollup-plugin-banner v<%= pkg.version %> by<%= pkg.author %>')
  ]
}

```

## API

banner(options)

### options

Type: String / Object / Array

#### String
For default javascript comments

Input:

```javascript
banner('rollup-plugin-banner v<%= pkg.version %> by <%= pkg.author %>')
```

Output:

```javascript
// rollup-plugin-banner v0.1.0 by yingye
```

The pkg is the content of the project package.json.

If your text is multi-line, you can use '\n'.

```javascript
banner('rollup-plugin-banner\nv<%= pkg.version %>\nby <%= pkg.author %>')
```

output:

```javascript
/**
* rollup-plugin-banner
* v0.1.0
* by yingye
*/
```

#### Object
For files

```javascript
banner({
  file: path.join(__dirname, 'banner.txt')，
  encoding: 'utf-8' // default is utf-8
})
```

### Array
For custom comment symbol

Input: 
```javascript
banner('My script\nVersion <%= pkg.version %>', '#')
```

Output:

```javascript
# My script
# Version 1.0
```
