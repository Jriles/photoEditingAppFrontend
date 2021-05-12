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
      tabletMode: false,
      mobileMode: false,
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
      //output cropper should be visible for crop changes, fuck me i guess
      outputVisible: false,
      storageCropperVisible: false,
      //this img is used by webgl to show user shape and current filter changes.
      //it is not used in any other capacity
      //we need this because we do not want to apply all filter changes every frame
      originalImgCanvas: null,
      originalImgTexture: null,
      //saved after submitting, making changes in cropperjs.
      //used to resize img if necessary
      imgWidth: 0,
      imgHeight: 0,
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
      cancel: false,
      save: false,
      flipX: false,
      flipY: false,
      originalAspectRatio: null,
      resetApectRatio: false,
      //not sure this is useful
      size: 100,
      sizeX: 100,
      sizeY: 100,
      straightening: false,
      straightenAmount: 0,
      straightened: false,
      //need to hold on to crop box details
      //for cropping and straightening
      //for cropping, these get set whenever we save during cropping
      cropBoxTop: false,
      cropBoxLeft: false,
      cropBoxWidth: false,
      cropBoxHeight: false,
      //for straightening
      //these only get set once.
      straightenCropBoxTop: false,
      straightenCropBoxLeft: false,
      straightenCropBoxWidth: false,
      straightenCropBoxHeight: false,
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
      state.desktopMode = mode
    },
    SET_TABLET_MODE (state, mode) {
      state.tabletMode = mode
    },
    SET_MOBILE_MODE (state, mode) {
      state.mobileMode = mode
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
    //call this to set img originalAspectRatio
    SET_ORIGINAL_ASPECT_RATIO (state, ratio) {
      state.originalAspectRatio = ratio
    },
    SET_OUTPUT_VISIBLE (state, mode) {
      state.outputVisible = mode
    },
    SET_STORAGE_CROPPER_VISIBLE (state, mode) {
      state.storageCropperVisible = mode
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
      state.straightened = mode
    },
    SET_STRAIGHTENAMOUNT (state, amount) {
      state.straightenAmount = amount
    },
    SET_CROP_BOX_DATA (state, data) {
      console.log('called set crop box data')
      console.log(data)
      state.cropBoxTop = data.top,
      state.cropBoxLeft = data.left,
      state.cropBoxWidth = data.width,
      state.cropBoxHeight = data.height
    },
    SET_STRAIGHTEN_CROP_BOX_DATA (state, data) {
      state.straightenCropBoxTop = data.top,
      state.straightenCropBoxLeft = data.left,
      state.straightenCropBoxWidth = data.width,
      state.straightenCropBoxHeight = data.height
    },
    SET_IMG_WIDTH (state, width) {
      state.imgWidth = width
    },
    SET_IMG_HEIGHT (state, height) {
      state.imgHeight = height
    },
    SET_ORIGINAL_IMG_CANVAS (state, canvas) {
      state.originalImgCanvas = canvas
    },
    SET_ORIGINAL_IMG_TEXTURE (state, texture) {
      state.originalImgTexture = texture
    }
  },
  actions: {
    setDesktopMode (context, mode) {
      context.commit('SET_DESKTOP_MODE', mode)
    },
    setTabletMode (context, mode) {
      context.commit('SET_TABLET_MODE', mode)
    },
    setMobileMode (context, mode) {
      context.commit('SET_MOBILE_MODE', mode)
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
    //used for cropper
    setOriginalAspectRatio (context, ratio) {
      context.commit('SET_ORIGINAL_ASPECT_RATIO', ratio)
    },
    setOutputVisible (context, mode) {
      context.commit('SET_OUTPUT_VISIBLE', mode)
    },
    setStorageCropperVisible (context, mode) {
      context.commit('SET_STORAGE_CROPPER_VISIBLE', mode)
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
      context.commit('SET_SIZEX', amount)
      context.commit('SET_SIZEY', amount)
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
    setStraightenAmount (context, amount) {
      context.commit('SET_STRAIGHTENAMOUNT', amount)
    },
    setCropBoxData (context, data) {
      context.commit('SET_CROP_BOX_DATA', data)
    },
    setStraightenCropBoxData (context, data) {
      context.commit('SET_STRAIGHTEN_CROP_BOX_DATA', data)
    },
    setImgWidth (context, width) {
      context.commit('SET_IMG_WIDTH', width)
    },
    setImgHeight (context, height) {
      context.commit('SET_IMG_HEIGHT', height)
    },
    setOriginalImgCanvas (context, canvas) {
      context.commit('SET_ORIGINAL_IMG_CANVAS', canvas)
    },
    setOriginalImgTexture (context, texture) {
      context.commit('SET_ORIGINAL_IMG_TEXTURE', texture)
    }
  }
})

//export default c
