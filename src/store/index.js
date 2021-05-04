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
      brightness: 0,
      contrast: 0,
      vibrance: 0,
      hue: 0,
      saturation: 0,
      red: 0,
      blue: 0,
      green: 0,
      // shadows: {
      //   val: 0
      // },
      // highlights: {
      //   val: 0
      // },
      smooth: 50,
      rotation: 0,
      cropping: false,
      cropped: false,
      //not sure this is useful
      size: 100,
      sizeX: 100,
      sizeY: 100,
      straightening: false,
      straightenAmount: 0,
      straightened: false,
      sepia: 0,
      noise: 0,
      ink: 0,
      //defaults, here bc single source of truth
      //we want defaults on inputs so we can reset
      // + on img form so we can undo all at once
      // :. single source of truth bish
      defaultBrightness: 0,
      defaultContrast: 0,
      defaultVibrance: 0,
      defaultHue: 0,
      defaultSaturation: 0,
      defaultRed: 0,
      defaultBlue: 0,
      defaultGreen: 0,
      defaultSmooth: 50,
      defaultRotation: 0,
      //not sure used
      defaultSize: 100,
      defaultSizeX: 100,
      defaultSizeY: 100,
      defaultStraightenAmount: 0,
      defaultSepia: 0,
      defaultNoise: 0,
      defaultInk: 0,
      defaultCropSize: .8,
      defaultCropping: false,
      defaultCropped: false,
      defaultStraightening: false,
      defaultStraigtened: false
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
    SET_DISPLAY_IMG (state, img) {
      state.displayImg = img
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
      state.brightness = amount
    },
    SET_CONTRAST (state, amount) {
      state.contrast = amount
    },
    SET_SMOOTH (state, amount) {
      state.smooth = amount
    },
    SET_SEPIA (state, amount) {
      state.sepia = amount
    },
    SET_NOISE (state, amount) {
      state.noise = amount
    },
    SET_INK (state, amount) {
      state.ink = amount
    },
    SET_VIBRANCE (state, amount) {
      state.vibrance = amount
    },
    SET_SATURATION (state, amount) {
      state.saturation = amount
    },
    SET_HUE (state, amount) {
      state.hue = amount
    },
    SET_RED (state, amount) {
      state.red = amount
    },
    SET_BLUE (state, amount) {
      state.blue = amount
    },
    SET_GREEN (state, amount) {
      state.green = amount
    },
    SET_SIZE (state, amount) {
      state.size = amount
    },
    SET_SIZEX (state, amount) {
      state.sizeX = amount
    },
    SET_SIZEY (state, amount) {
      state.sizeY = amount
    },
    SET_ROTATION (state, amount) {
      state.rotation = amount
    },
    SET_CROPPING (state, mode) {
      state.cropping = mode
    },
    SET_CROPPED (state, mode) {
      state.cropped = mode
    },
    SET_STRAIGHTENING (state, mode) {
      state.straightening = mode
    },
    SET_STRAIGHTENED (state, mode) {
      state.straighened = mode
    },
    SET_STRAIGHTENAMOUNT (state, amount) {
      state.straightenAmount = amount
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
    },
    setCropperVisible (context, mode) {
      context.commit('SET_CROPPER_VISIBLE', mode)
    },
    setShapeImg (context, img) {
      context.commit('SET_SHAPE_IMG', img)
    },
    setFilterImg (context, img) {
      context.commit('SET_FILTER_IMG', img)
    },
    setDisplayImg (context, img) {
      context.commit('SET_DISPLAY_IMG', img)
    },
    setImgFileExt (context, extension) {
      context.commit('SET_IMG_FILE_EXT', extension)
    },
    //not sure we need
    setOriginalAspectRatio (context, ratio) {
      context.commit('SET_ORIGINAL_ASPECT_RATIO', ratio)
    },
    setOutputVisible (context, mode) {
      context.commit('SET_OUTPUT_VISIBLE', mode)
    },
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
    setSize (context, amount) {
      context.commit('SET_SIZE', amount)
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
    setStraighten (context, amount) {
      context.commit('SET_STRAIGHTENAMOUNT', amount)
    }
  }
})

//export default c
