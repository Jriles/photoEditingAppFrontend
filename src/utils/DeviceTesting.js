function isMobile (windowWidth) {
  if (windowWidth < 500) {
    return true
  }
  return false
}

function isTablet (windowWidth) {
  if (windowWidth > 500 && windowWidth < 1100){
    return true
  }
  return false
}

function isDesktop (windowWidth) {
  if (windowWidth > 1100) {
    return true
  }
  return false
}

module.exports = {
  isMobile,
  isTablet,
  isDesktop
}
