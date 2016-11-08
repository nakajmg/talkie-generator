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
  const config = require(`${dirPath}/config`)
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
  const contents = md.split(config.delimiter || /\n-{5}\n/)

  contents.forEach((markdown, index) => {
    config.pages[index].contents = markdown
  })

  config.pages.forEach((config) => {
    config.type = config.type || 'text/x-markdown'
    config.tag = config.type === 'html' ? 'section' : 'template'

    if (_.isUndefined(config.attributes)) {
      config.attributes = []
      return
    }
    if (_.isString(config.attributes)) {
      config.attributes = [config.attributes]
      return
    }
    if (_.isObject(config.attributes)) {
      config.attributes = _.map(config.attributes, (value, key) => {
        return value ? `${cc.paramCase(key)}="${value}"` : cc.paramCase(key)
      })
    }
  })

  const html = ejs.render(template, config, {})
  const outputPath = path.resolve(path.normalize(`${config.dist || '.'}/${dirPath}/index.html`))
  fs.outputFileSync(outputPath, html, 'utf-8')
  console.log(`Generated: ${outputPath}`)
}

module.exports = generate
