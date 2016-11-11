module.exports = {
  defaults: {
    attributes: {
      layout: 'bullets'
    }
  },
  pages: [
    {
      name: 'top',
      attributes: {
        layout: 'title',
        invert: '',
        backface: './img/bg.png',
        backfaceFilter: 'blur(2px) brightness(1.5)'
      },
      note: 'タイトルページのノート'
    },
    {
      name: 'code',
      attributes: {
        layout: 'code'
      }
    },
    {
      name: 'html',
      type: 'html',
      attributes: 'layout'
    },
    {
      name: 'title',
      attributes: {
        layout: 'title'
      }
    }
  ],
  delimiter: /\n-----\n/, // optional {RegExp}
  dist: '.' // optional {String}
}
