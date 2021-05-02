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
      //img: null,
      uploaded: false,
      imgFileName: null,
      cropperVisible: false,
      shapeImg: null,
      filterImg: null,
      originalDisplayImg: null,
      imgFileExt: null,
      //not sure this does anything!?
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
      state.desktopMode = mode
    },
    SET_CONTAINER_WIDTH (state, percent) {
      state.containerWidth = percent
    },
    SET_CONTAINER_HEIGHT (state, height) {
      state.containerHeight = height
    },
    SET_ORIGINAL_IMG (state, img) {
      state.originalImg = img
    },
    SET_ORIGINAL_VISIBLE (state, mode) {
      state.originalVisible = mode
    },
    SET_UPLOADED (state, mode) {
      state.uploaded = mode
    },
    SET_IMG_FILE_NAME (state, name) {
      state.imgFileName = name
    },
    SET_CROPPER_VISIBLE (state, mode) {
      state.cropperVisible = mode
    },
    SET_SHAPE_IMG (state, img) {
      state.shapeImg = img
    },
    SET_FILTER_IMG (state, img) {
      state.filterImg = img
    },
    SET_ORGINAL_DISPLAY_IMG (state, img) {
      state.originalDisplayImg = img
    },
    SET_IMG_FILE_EXT (state, extension) {
      state.imgFileExt = extension
    },
    SET_ORIGINAL_ASPECT_RATIO (state, ratio) {
      state.originalAspectRatio = ratio
    },
    SET_OUTPUT_VISIBLE (state, mode) {
      state.outputVisible = mode
    },
    SET_BRIGHTNESS (state, amount) {
      state.brightness.val = amount
    },
    SET_CONTRAST (state, amount) {
      state.contrast.val = amount
    },
    SET_SMOOTH (state, amount) {
      state.smooth.val = amount
    },
    SET_SEPIA (state, amount) {
      state.sepia.val = amount
    },
    SET_NOISE (state, amount) {
      state.noise.val = amount
    },
    SET_INK (state, amount) {
      state.ink.val = amount
    },
    SET_VIBRANCE (state, amount) {
      state.vibrance.val = amount
    },
    SET_SATURATION (state, amount) {
      state.saturation.val = amount
    },
    SET_HUE (state, amount) {
      state.hue.val = amount
    },
    SET_RED (state, amount) {
      state.red.val = amount
    },
    SET_BLUE (state, amount) {
      state.blue.val = amount
    },
    SET_GREEN (state, amount) {
      state.green.val = amount
    },
    SET_SIZEX (state, amount) {
      state.sizeX.val = amount
    },
    SET_SIZEY (state, amount) {
      state.sizeY.val = amount
    },
    SET_ROTATION (state, amount) {
      state.rotation.val = amount
    },
    SET_CROPPING (state, mode) {
      state.cropping.val = mode
    },
    SET_CROPPED (state, mode) {
      state.cropped.val = mode
    },
    SET_STRAIGHTENING (state, mode) {
      state.straightening.val = mode
    },
    SET_STRAIGHTENED (state, mode) {
      state.straighened.val = mode
    },
    SET_STRAIGHTENAMOUNT (state, amount) {
      state.straightenAmount.val = amount
    }
  },
  actions: {
    setDesktopMode (context, mode) {
      context.commit('SET_DESKTOP_MODE', mode)
    },
    setContainerWidth (context, percent) {
      context.commit('SET_CONTAINER_WIDTH', percent)
    },
    setContainerHeight (context, height) {
      context.commit('SET_CONTAINER_HEIGHT', height)
    },
    setOriginalImg (context, img) {
      context.commit('SET_ORIGINAL_IMG', img)
    },
    setOriginalVisible (context, mode) {
      context.commit('SET_ORIGINAL_VISIBLE', mode)
    },
    setUploaded (context, mode) {
      context.commit('SET_UPLOADED', mode)
    },
    setImgFileName (context, name) {
      context.commit('SET_IMG_FILE_NAME', name)
    }
    setBrightness (context, amount) {
      context.commit('SET_BRIGHTNESS', amount)
    },
    setContrast (context, amount) {
      context.commit('SET_CONTRAST', amount)
    },
    setSmooth (context, amount) {
      context.commit('SET_SMOOTH', amount)
    },
    setSepia (context, amount) {
      context.commit('SET_SEPIA', amount)
    },
    setNoise (context, amount) {
      context.commit('SET_NOISE', amount)
    },
    setInk (context, amount) {
      context.commit('SET_INK', amount)
    },
    setVibrance (context, amount) {
      context.commit('SET_VIBRANCE', amount)
    },
    setHue (context, amount) {
      context.commit('SET_HUE', amount)
    },
    setSaturation (context, amount) {
      context.commit('SET_SATURATION', amount)
    },
    setRed (context, amount) {
      context.commit('SET_RED', amount)
    },
    setBlue (context, amount) {
      context.commit('SET_BLUE', amount)
    },
    setGreen (context, amount) {
      context.commit('SET_GREEN', amount)
    },
    setSizeX (context, amount) {
      context.commit('SET_SIZEX', amount)
    },
    setSizeY (context, amount) {
      context.commit('SET_SIZEY', amount)
    },
    setRotation (context, amount) {
      context.commit('SET_ROTATION', amount)
    },
    setCropping (context, mode) {
      context.commit('SET_CROPPING', mode)
    },
    setCropped (context, mode) {
      context.commit('SET_CROPPED', mode)
    },
    setStraightening (context, mode) {
      context.commit('SET_STRAIGHTENING', mode)
    },
    setStraightened (context, mode) {
      context.commit('SET_STRAIGHTENED', mode)
    },
    setSraighten (context, amount) {
      context.commit('SET_STRAIGHTENAMOUNT', amount)
    }
  }
})

//export default c
