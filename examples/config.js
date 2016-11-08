module.exports = {
  pages: [
    {
      attributes: {
        layout: 'title',
        invert: '',
        backface: './img/bg.png',
        backfaceFilter: 'blur(2px) brightness(1.5)'
      },
      note: 'タイトルページのノート'
    },
    {
      attributes: {
        layout: 'bullets'
      }
    },
    {
      attributes: {
        layout: 'bullets'
      }
    },
    {
      attributes: {
        layout: 'title'
      }
    },
    {
      attributes: {
        layout: 'title'
      }
    },
    {
      attributes: {
        layout: 'bullets'
      }
    },
    {
      attributes: {
        layout: 'code'
      }
    },
    {
      type: 'html',
      attributes: 'layout'
    },
    {
      attributes: {
        layout: 'title'
      }
    },
    {
      attributes: {
        layout: 'bullets'
      }
    }
  ],
  delimiter: /\n-----\n/, // optional {RegExp}
  dist: '.' // optional {String}
}
