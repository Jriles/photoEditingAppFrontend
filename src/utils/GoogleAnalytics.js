function sendGA4FileEvent (vueRef, featureName) {
  vueRef.$gtag.event('file_option', {
    'feature_name' : featureName
  })
}

function sendGA4PhotoEditEvent (vueRef, featureName) {
  vueRef.$gtag.event('photo_edit', {
    'feature_name' : featureName
  })
}

module.exports = {
  sendGA4FileEvent,
  sendGA4PhotoEditEvent
}
