const _ = require('lodash')

module.exports = {
  async init($, config) {
    for (let i = 1; i < 6; i++) {
      $(`h${i}.tabset`).each((idx, elm) => {
        let content = `<v-tabs>`
        let tabs = []
        let tabContents = []
        $(elm).nextUntil(_.times(i, t => `h${t + 1}`).join(', '), `h${i + 1}`).each((hidx, hd) => {
          tabs.push(`<v-tab>${$(hd).html()}</v-tab>`)
          let tabContent = ''
          $(hd).nextUntil(_.times(i + 1, t => `h${t + 1}`).join(', ')).each((cidx, celm) => {
            tabContent += $.html(celm)
            $(celm).remove()
          })
          tabContents.push(`<v-tab-item>${tabContent}</v-tab-item>`)
          $(hd).remove()
        })
        content += `<template v-slot:tabs>${tabs.join('')}</template>`
        content += `<template v-slot:content>${tabContents.join('')}</template>`
        content += `</v-tabs>`
        $(elm).replaceWith($(content))
      })
    }
  }
}
