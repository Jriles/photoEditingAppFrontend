function sendGA4ClickEvent (vueRef, featureName) {
  vueRef.$gtag.event('click', {
    'feature_name' : featureName
  })
}

function sendGA4InputEvent (vueRef, featureName) {
  vueRef.$gtag.event('feature_use', {
    'feature_name' : featureName
  })
}

module.exports = {
  sendGA4InputEvent,
  sendGA4ClickEvent
}
