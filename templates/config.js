module.exports = {
  pages: [
    {
      attributes: {
        layout: 'title',
        invert: '',
        backface: './img/bg.png',
        backfaceFilter: 'blur(2px) brightness(1.5)'
      },
      note: 'note'
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
