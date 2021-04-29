import { createStore } from 'vuex'

const IMAGE_HEIGHT = screen.height - 200;
const MOBILE_CANVAS_PERCENT = .8;
const DESKTOP_CANVAS_PERCENT = .7;
//how long we wait for an image to load before doing work
const IMAGE_LOAD_TIME = 150;


export default createStore({
  state () {
    return {
      desktopMode: false,
      originalImg: null,
      originalVisible: false,
      img: null,
      uploaded: false,
      imgFileName: null,
      cropperVisible: false,
      shapeImg: null,
      filterImg: null,
      originalDisplayImg: null,
      imgFileExt: null,
      originalAspectRatio: null,
      containerHeight: IMAGE_HEIGHT,
      containerWidth: null,
      outputVisible: false,

      //different image properties
      //each one is an object, some alterations might be more complicated than just a number
      brightness: {
        val: 0
      },
      contrast: {
        val: 0
      },
      vibrance: {
        val: 0
      },
      hue: {
        val: 0
      },
      saturation: {
        val: 0
      },
      red: {
        val: 0
      },
      blue: {
        val: 0
      },
      green: {
        val: 0
      },
      // shadows: {
      //   val: 0
      // },
      // highlights: {
      //   val: 0
      // },
      smooth: {
        val: 50
      },
      rotation: {
        val: 0
      },
      cropping: {
        val: false,
        defaultSize: 0.8
      },
      cropped: {
        val: false
      },
      size: {
        val: 100
      },
      sizeX: {
        val: 100
      },
      sizeY: {
        val: 100
      },
      straightening: {
        val: false
      },
      straightenAmount: {
        val: 0
      },
      straightened: {
        val: false
      },
      sepia: {
        val: 0
      },
      noise: {
        val: 0
      },
      ink: {
        val: 0
      },
      //defaults
      defaultBrightness: {
        val: 0
      },
      defaultContrast: {
        val: 0
      },
      defaultVibrance: {
        val: 0
      },
      defaultHue: {
        val: 0
      },
      defaultSaturation: {
        val: 0
      },
      defaultRed: {
        val: 0
      },
      defaultBlue: {
        val: 0
      },
      defaultGreen: {
        val: 0
      },
      defaultSmooth: {
        val: 50
      },
      defaultRotation: {
        val: 0
      },
      defaultSize: {
        val: 100
      },
      defaultSizeX: {
        val: 100
      },
      defaultSizeY: {
        val: 100
      },
      defaultStraightenAmount: {
        val: 0
      },
      defaultSepia: {
        val: 0
      },
      defaultNoise: {
        val: 0
      },
      defaultInk: {
        val: 0
      }
    }
  },
  mutations: {
    SET_DESKTOP_MODE (state, mode) {
      console.log('mode: ' + mode)
      state.desktopMode = false
    },
    SET_CONTAINER_WIDTH (state, percent) {
      state.containerWidth = percent
    }
  },
  actions: {
    setDesktopMode (context, mode) {
      context.commit('SET_DESKTOP_MODE', mode)
    },
    setContainerWidth (context, percent) {
      context.commit('SET_CONTAINER_WIDTH', percent)
    }
  }
})

//export default c
