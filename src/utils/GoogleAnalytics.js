function sendGA4ClickEvent (vueRef, featureName) {
  vueRef.$gtag.event('click', {
    'feature_name' : featureName
  })
}

function sendGA4InputEvent (vueRef, featureName) {
  vueRef.$gtag.event('input', {
    'feature_name' : featureName
  })
}

module.exports = {
  sendGA4InputEvent,
  sendGA4ClickEvent
}
