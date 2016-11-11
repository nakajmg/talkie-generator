const ejs = require('ejs')
const fs = require('fs-extra')
const _ = require('lodash')
const cc = require('change-case')
const path = require('path')

const generate = (dirPath) => {
  if (_.isUndefined(dirPath) || !_.isString(dirPath)) {
    var err = new Error(`Invalid arguments: arguments must be String`)
    console.log(err)
    return err
  }
  dirPath = path.resolve(dirPath)
  delete require.cache[`${dirPath}/config.js`];
  const config = require(`${dirPath}/config.js`)
  if (_.isUndefined(config)) {
    var err = new Error('Missing config.js')
    console.log(err)
    return err
  }

  var template;
  try {
    template = fs.readFileSync(`${dirPath}/template.ejs`, 'utf-8')
  }
  catch (e) {
    template = fs.readFileSync(`${__dirname}/template.ejs`, 'utf-8')
  }
  try {
    const md = fs.readFileSync(`${dirPath}/index.md`, 'utf-8')
  }
  catch(e) {
    console.log(e.message)
    var err = new Error('Missing index.md')
    console.log(err)
    return err
  }
  const pages = _.map(md.split(config.delimiter || /\n-{5}\n/), (contents) => {
    var name;
    if (/<!--(.+?)-->/.test(contents)) {
      contents = contents.replace(/<!--(.+?)-->\n/i, (match, $1) => {
        name = $1
        return ''
      })
    }
    return {contents, name}
  })

  pages.forEach((page) => {
    var pageConfig;
    if (!_.isUndefined(page.name)) {
      var _config = _.find(config.pages, {name: page.name})
      pageConfig = _config ? _.assign({}, _config) : undefined
    }
    if (_.isUndefined(pageConfig)) {
      pageConfig = _.assign({}, config.defaults)
    }
    page.config = pageConfig
  })

  pages.forEach((page) => {
    page.config.type = page.config.type || 'text/x-markdown'
    page.config.tag = page.config.type === 'html' ? 'section' : 'template'

    if (_.isUndefined(page.config.attributes)) {
      page.config.attributes = ['layout']
      return
    }
    if (_.isString(page.config.attributes)) {
      page.config.attributes = [page.config.attributes]
      return
    }
    if (_.isObject(page.config.attributes)) {
      page.config.attributes = _.map(page.config.attributes, (value, key) => {
        return value ? `${cc.paramCase(key)}="${value}"` : cc.paramCase(key)
      })
    }
  })

  const html = ejs.render(template, {pages}, {})
  const outputPath = path.resolve(path.normalize(`${dirPath}/${config.dist || '.'}/index.html`))
  fs.outputFileSync(outputPath, html, 'utf-8')
  console.log(`Generated: ${outputPath}`)
}

module.exports = generate
