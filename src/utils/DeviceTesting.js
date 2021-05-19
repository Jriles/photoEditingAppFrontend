const MOBILE_MAX_WIDTH = 500
const TABLET_MAX_WIDTH = 1100
const DESKTOP_MAX_WIDTH = 1600
const LARGE_DESKTOP_MAX_WIDTH = 2100
const ULTRAWIDTH_MAX_WIDTH = 4000

function isMobile (windowWidth) {
  if (windowWidth < MOBILE_MAX_WIDTH) {
    return true
  }
  return false
}

function isTablet (windowWidth) {
  if (windowWidth > MOBILE_MAX_WIDTH && windowWidth < TABLET_MAX_WIDTH){
    return true
  }
  return false
}

// function isDesktop (windowWidth) {
//   if (windowWidth > TABLET_MAX_WIDTH && windowWidth < DESKTOP_MAX_WIDTH) {
//     return true
//   }
//   return false
// }

function isDesktop (windowWidth) {
  if (windowWidth > TABLET_MAX_WIDTH) {
    return true
  }
  return false
}

function isLargeDesktop (windowWidth) {
  if (windowWidth > DESKTOP_MAX_WIDTH && windowWidth < LARGE_DESKTOP_MAX_WIDTH) {
    return true
  }
  return false
}

function isUltraWide (windowWidth) {
  if (windowWidth > LARGE_DESKTOP_MAX_WIDTH) {
    return true
  }
  return false
}

module.exports = {
  isMobile,
  isTablet,
  isDesktop,
  isLargeDesktop,
  isUltraWide
}
