<template>
  <!--desktop-->
  <div v-if="desktopMode || ultrawideMode || largeDesktopMode">
    <div v-bind:class="[{ desktopOffset : desktopMode }, { largeDesktopOffset : largeDesktopMode }, { ultrawideOffset : ultrawideMode }]" class="columns navbarOffset">
      <div class="column is-three-quarters">
        <div>
          <img id="displayImg" v-show="originalVisible" :src="displayImg"/>
          <img id="originalImg" v-show="false" :src="originalImg"/>
        </div>
        <div id="imgBucket" class="desktop-img-bucket">
          <div v-if="!uploaded" v-bind:class="{ customCanvasOverlayDesktop : desktopMode, customCanvasOverlayUltrawide : ultrawideMode, customCanvasOverlayLargeDesktop : largeDesktopMode }">
            <h1 class="title has-text-white main-title">
                Transform Your Images
            </h1>
            <div class="file is-primary is-centered">
              <label class="file-label">
                <input class="file-input" type="file" name="photo" @change="submit">
                <span class="file-cta has-background-black">
                  <span class="file-label">
                    Choose an Image
                  </span>
                </span>
              </label>
            </div>
          </div>
          <img id="shapeImg" alt="Free photo editor" class="hidden" :src="shapeImg"/>
          <img id="filterImg" alt="Edit photo brightness" class="hidden" :src="filterImg"/>
          <VueCropper ref="cropper" :autoCropArea="cropping.defaultSize" :autoCrop="cropping" v-show="cropperVisible" :minContainerWidth="containerWidth" alt="Crop image"></VueCropper>
          <div class="hiddenCropperStyling">
            <VueCropper ref="storageCropper" :autoCropArea="2" :autoCrop="false" v-show="storageCropperVisible" alt="Crop image" :minContainerWidth="containerWidth" :maxContainerHeight="containerHeight"></VueCropper>
          </div>
          <div class="hiddenCropperStyling">
            <VueCropper ref="outputCropper" :autoCropArea="2" :autoCrop="false" v-show="outputVisible" alt="Free photo editor" :minContainerWidth="containerWidth" :maxContainerHeight="containerHeight"></VueCropper>
          </div>
        </div>
      </div>
      <div class="has-text-centered" v-bind:class="{ desktopControls : desktopMode, largeDesktopControls : largeDesktopMode, ultrawideControls : ultrawideMode }">
        <div v-show="uploaded" class="mb-5">
          <div v-show="uploaded" class="columns is-multiline">
            <div class="column">
              <div class="file is-primary is-centered">
                <label class="file-label">
                  <input class="file-input" type="file" name="photo" @change="submit">
                  <span class="file-cta has-background-black">
                    <span class="file-label">
                      <font-awesome-icon icon="file-upload" />
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div class="column">
              <button id="downloadButton" @click="prepOutput()" class="button is-black"><font-awesome-icon icon="file-download" /></button>
            </div>
            <div class="column">
              <button id="downloadButton" @click="undoAll()" class="button is-black"><font-awesome-icon icon="undo" /></button>
            </div>
            <div class="column">
              <button class="button is-black" @click="changeOriginalVisible()"><font-awesome-icon icon="image" />&nbsp;/&nbsp;<font-awesome-icon :icon="['far', 'image']"/></button>
            </div>
          </div>
        </div>
        <router-view @eventBus="eventsHandler" @doneChangingFilter="doneChangingFilter"/>
      </div>
    </div>
  </div>
  <!--tablet-->
  <div v-if="tabletMode" class="columns navbarOffset">
    <div class="column is-three-quarters">
      <div>
        <img id="displayImg" v-show="originalVisible" :src="displayImg"/>
        <img id="originalImg" v-show="false" :src="originalImg"/>
      </div>
      <div id="imgBucket" class="desktop-img-bucket">
        <div v-if="!uploaded" class="custom-canvas-overlay-tablet">
          <h2 class="title has-text-white">
              Transform Your Images
          </h2>
          <div class="file is-primary is-centered">
            <label class="file-label">
              <input class="file-input" type="file" name="photo" @change="submit">
              <span class="file-cta has-background-black">
                <span class="file-label">
                  Choose an Image
                </span>
              </span>
            </label>
          </div>
        </div>
        <img id="shapeImg" alt="Free photo editor" class="hidden" :src="shapeImg"/>
        <img id="filterImg" alt="Edit photo brightness" class="hidden" :src="filterImg"/>
        <VueCropper ref="cropper" :autoCropArea="cropping.defaultSize" :autoCrop="cropping" v-show="cropperVisible" :minContainerWidth="containerWidth" :maxContainerHeight="containerHeight" alt="Crop image"></VueCropper>
        <div class="hiddenCropperStyling">
          <VueCropper ref="storageCropper" :autoCropArea="2" :autoCrop="false" v-show="storageCropperVisible" alt="Crop image" :minContainerWidth="containerWidth" :maxContainerHeight="containerHeight"></VueCropper>
        </div>
        <div class="hiddenCropperStyling">
          <VueCropper ref="outputCropper" :autoCropArea="2" :autoCrop="false" v-show="outputVisible" alt="Free photo editor" :minContainerWidth="containerWidth" :maxContainerHeight="containerHeight"></VueCropper>
        </div>
      </div>
    </div>
    <div class="tabletControls has-text-centered">
      <div v-show="uploaded" class="mb-5">
        <div v-show="uploaded" class="columns is-multiline">
          <div class="column">
            <div class="file is-primary is-centered">
              <label class="file-label">
                <input class="file-input" type="file" name="photo" @change="submit">
                <span class="file-cta has-background-black">
                  <span class="file-label">
                    <font-awesome-icon icon="file-upload" />
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div class="column">
            <button id="downloadButton" @click="prepOutput()" class="button is-black"><font-awesome-icon icon="file-download" /></button>
          </div>
          <div class="column">
            <button id="downloadButton" @click="undoAll()" class="button is-black"><font-awesome-icon icon="undo" /></button>
          </div>
          <div class="column">
            <button class="button is-black" @click="changeOriginalVisible()"><font-awesome-icon icon="image" />&nbsp;/&nbsp;<font-awesome-icon :icon="['far', 'image']"/></button>
          </div>
        </div>
      </div>
      <router-view @eventBus="eventsHandler" @doneChangingFilter="doneChangingFilter"/>
    </div>
  </div>
  <!--mobile-->
  <div v-if="mobileMode">
    <div class="navbarOffset">
      <div>
        <div>
          <img id="displayImg" v-show="originalVisible" :src="displayImg"/>
          <img id="originalImg" v-show="false" :src="originalImg"/>
        </div>
        <div id="imgBucket">
          <div v-if="!uploaded" class="custom-canvas-overlay-mobile">
            <h3 class="title has-text-white">
                Transform Your Images
            </h3>
            <div class="file is-primary is-centered">
              <label class="file-label">
                <input class="file-input" type="file" name="photo" @change="submit">
                <span class="file-cta has-background-black">
                  <span class="file-label">
                    Choose an Image
                  </span>
                </span>
              </label>
            </div>
          </div>
          <img id="shapeImg" alt="Free photo editor" class="hidden" :src="shapeImg"/>
          <img id="filterImg" alt="Edit photo brightness" class="hidden" :src="filterImg"/>
          <VueCropper ref="cropper" :autoCropArea="cropping.defaultSize" :autoCrop="cropping" v-show="cropperVisible" :minContainerWidth="containerWidth" :maxContainerHeight="containerHeight" alt="Crop image"></VueCropper>
          <div class="hiddenCropperStyling">
            <VueCropper ref="storageCropper" :autoCropArea="2" :autoCrop="false" v-show="storageCropperVisible" alt="Crop image" :minContainerWidth="containerWidth" :maxContainerHeight="containerHeight"></VueCropper>
          </div>
          <div class="hiddenCropperStyling">
            <VueCropper ref="outputCropper" :autoCropArea="2" :autoCrop="false" v-show="outputVisible" alt="Free photo editor" :minContainerWidth="containerWidth" :maxContainerHeight="containerHeight"></VueCropper>
          </div>
        </div>
      </div>
      <div v-show="!uploaded" class="has-text-centered mt-5">
        <router-view @eventBus="eventsHandler" @doneChangingFilter="doneChangingFilter"/>
      </div>
      <div v-show="uploaded" class="has-text-centered mt-3">
        <router-view @eventBus="eventsHandler" @doneChangingFilter="doneChangingFilter"/>
      </div>
      <div v-show="uploaded" class="columns is-mobile mt-1">
        <div class="column">
          <div class="file is-primary is-centered">
            <label class="file-label">
              <input class="file-input" type="file" name="photo" @change="submit">
              <span class="file-cta has-background-black">
                <span class="file-label">
                  <font-awesome-icon icon="file-upload" />
                </span>
              </span>
            </label>
          </div>
        </div>
        <div class="column">
          <button id="downloadButton" @click="prepOutput()" class="button is-black"><font-awesome-icon icon="file-download" /></button>
        </div>
        <div class="column">
          <button id="downloadButton" @click="undoAll()" class="button is-black"><font-awesome-icon icon="undo" /></button>
        </div>
        <div class="column">
          <button class="button is-black" @click="changeOriginalVisible()"><font-awesome-icon icon="image" />&nbsp;/&nbsp;<font-awesome-icon :icon="['far', 'image']"/></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import glfx from 'glfx';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import { saveAs } from 'file-saver';
import { isMobile, isTablet, isDesktop, isLargeDesktop, isUltraWide, isWebitRenderEngine } from '@/utils/DeviceTesting'
import { sendGA4PhotoEditEvent, sendGA4FileEvent } from '@/utils/GoogleAnalytics'
const IMAGE_HEIGHT = window.innerHeight - 50;
const MOBILE_IMAGE_HEIGHT = window.innerHeight - 350;
const MOBILE_CANVAS_PERCENT = 1;
const DESKTOP_CANVAS_PERCENT = .75;
//how long we wait for an image to load before doing work
const IMAGE_LOAD_TIME = 150;
const DISPLAY_IMAGE_QUALITY = .5;

export default {
  name: 'ImageForm',
  emits: ['updateColorVal', 'updateShapeVal'],
  created(){
    //respond if window has changed size dramatically.
    window.addEventListener("resize", this.resizeCheck);

    //call set device details here
    this.setDeviceMode()
    this.setContainerDimensions()

    const imgURL = this.getLandingImgURL()

    const path = this.$route.name;
    const img = new Image();
    const ref = this;
    img.addEventListener("load", function () {
      const canvas = ref.getGLFXCanvas()
      const context = ref.getWebGLCanvasContext(canvas)
      const texture = ref.getGLFXTexture(canvas, this)
      const texturedCanvas = ref.applyTextureToGLFXCanvas(canvas, texture)
      ref.$store.dispatch('setFilterImg', imgURL)
      ref.$store.dispatch('setShapeImg', imgURL)
      ref.$store.dispatch('setOriginalImg', imgURL)
      ref.$store.dispatch('setDisplayImg', imgURL)
      ref.$store.dispatch('setOriginalImgCanvas', texturedCanvas)
      ref.$store.dispatch('setOriginalImgTexture', texture)
      ref.$store.dispatch('setOriginalCanvasContext', context)
      ref.initPageBasedOnPath(path, true)
    })
    img.src = imgURL;

    if (isWebitRenderEngine(window.navigator.vendor)) {
      alert('Please re-open eazysnap on firefox or desktop. Apple does not offer bug support for webGL, one of our core technologies. Sorry for any inconvenience.')
    }
  },
  destroyed () {
    window.removeEventListener("resize", this.resizeCheck);
  },
  components: {
    VueCropper
  },
  props: {
    msg: String
  },
  computed: {
    ultrawideMode: function () {
      return this.$store.state.ultrawideMode
    },
    largeDesktopMode: function () {
      return this.$store.state.largeDesktopMode
    },
    desktopMode: function () {
      return this.$store.state.desktopMode
    },
    tabletMode: function () {
      return this.$store.state.tabletMode
    },
    mobileMode: function () {
      return this.$store.state.mobileMode
    },
    originalImg: function () {
      return this.$store.state.originalImg
    },
    originalVisible: function () {
      return this.$store.state.originalVisible
    },
    uploaded: function () {
      return this.$store.state.uploaded
    },
    imgFileName: function () {
      return this.$store.state.imgFileName
    },
    cropperVisible: function () {
      return this.$store.state.cropperVisible
    },
    shapeImg: function () {
      return this.$store.state.shapeImg
    },
    filterImg: function () {
      return this.$store.state.filterImg
    },
    displayImg: function () {
      return this.$store.state.displayImg
    },
    originalImgCanvas: function () {
      return this.$store.state.originalImgCanvas
    },
    originalImgTexture: function () {
      return this.$store.state.originalImgTexture
    },
    originalCanvasContext: function () {
      return this.$store.state.originalCanvasContext
    },
    imgFileExt: function () {
      return this.$store.state.imgFileExt
    },
    imgWidth: function () {
      return this.$store.state.imgWidth
    },
    imgHeight: function () {
      return this.$store.state.imgHeight
    },
    originalAspectRatio: function () {
      return this.$store.state.originalAspectRatio
    },
    containerHeight: function () {
      return this.$store.state.containerHeight
    },
    containerWidth: function () {
      return this.$store.state.containerWidth
    },
    outputVisible: function () {
      return this.$store.state.outputVisible
    },
    storageCropperVisible: function () {
      return this.$store.state.storageCropperVisible
    },
    // different image properties
    // each one is an object, some alterations might be more complicated than just a number
    brightness: function () {
      return this.$store.state.brightness
    },
    contrast: function () {
      return this.$store.state.contrast
    },
    vibrance: function () {
      return this.$store.state.vibrance
    },
    hue: function () {
      return this.$store.state.hue
    },
    saturation: function () {
      return this.$store.state.saturation
    },
    red: function () {
      return Number(this.$store.state.red)
    },
    blue: function () {
      return Number(this.$store.state.blue)
    },
    green: function () {
      return Number(this.$store.state.green)
    },
    // shadows: {
    //   val: 0
    // },
    // highlights: {
    //   val: 0
    // },
    smooth: function () {
      return this.$store.state.smooth
    },
    rotation: function () {
      return this.$store.state.rotation
    },
    cropping: function () {
      return this.$store.state.cropping
    },
    cropped: function () {
      return this.$store.state.cropped
    },
    size: function () {
      return this.$store.state.size
    },
    sizeX: function () {
      return this.$store.state.sizeX
    },
    sizeY: function () {
      return this.$store.state.sizeY
    },
    straightening: function () {
      return this.$store.state.straightening
    },
    straightenAmount: function () {
      return this.$store.state.straightenAmount
    },
    straightened: function () {
      return this.$store.state.straightened
    },
    sepia: function () {
      return this.$store.state.sepia
    },
    noise: function () {
      return this.$store.state.noise
    },
    ink: function () {
      return this.$store.state.ink
    },
    //for cropping
    cropBoxTop: function () {
      return this.$store.state.cropBoxTop
    },
    cropBoxLeft: function () {
      return this.$store.state.cropBoxLeft
    },
    cropBoxWidth: function () {
      return this.$store.state.cropBoxWidth
    },
    cropBoxHeight: function () {
      return this.$store.state.cropBoxHeight
    },
    //for straightening
    straightenCropBoxTop: function () {
      return this.$store.state.straightenCropBoxTop
    },
    straightenCropBoxLeft: function () {
      return this.$store.state.straightenCropBoxLeft
    },
    straightenCropBoxWidth: function () {
      return this.$store.state.straightenCropBoxWidth
    },
    straightenCropBoxHeight: function () {
      return this.$store.state.straightenCropBoxHeight
    },
    //need defaults here
    //light effexs
    defaultBrightness: function () {
      return this.$store.state.defaultBrightness
    },
    defaultContrast: function () {
      return this.$store.state.defaultContrast
    },
    defaultSmooth: function () {
      return this.$store.state.defaultSmooth
    },
    defaultSepia: function () {
      return this.$store.state.defaultSepia
    },
    defaultNoise: function () {
      return this.$store.state.defaultNoise
    },
    defaultInk: function () {
      return this.$store.state.defaultInk
    },
    // color
    defaultVibrance: function () {
      return this.$store.state.defaultVibrance
    },
    defaultHue: function () {
      return this.$store.state.defaultHue
    },
    defaultSaturation: function () {
      return this.$store.state.defaultSaturation
    },
    defaultRed: function () {
      return this.$store.state.defaultRed
    },
    defaultBlue: function () {
      return this.$store.state.defaultBlue
    },
    defaultGreen: function () {
      return this.$store.state.defaultGreen
    },
    //shape
    defaultRotation: function () {
      return this.$store.state.defaultRotation
    },
    defaultSize: function () {
      return this.$store.state.defaultSize
    },
    defaultSizeX: function () {
      return this.$store.state.defaultSizeX
    },
    defaultSizeY: function () {
      return this.$store.state.defaultSizeY
    },
    defaultStraightenAmount: function () {
      return this.$store.state.defaultStraightenAmount
    },
    defaultCropSize: function () {
      return this.$store.state.defaultCropSize
    },
    defaultCropping: function () {
      return this.$store.state.defaultCropping
    },
    defaultCropped: function () {
      return this.$store.state.defaultCropped
    },
    defaultStraightening: function () {
      return this.$store.state.defaultStraightening
    },
    defaultStraigtened: function () {
      return this.$store.state.defaultStraigtened
    }
  },
  watch: {
    $route (to, from){
      const path = this.$route.name;
      //dont reinit page if going from glfx to glfx
      //no need, less smooth
      if (!this.glfxToGlfx(to.name, from.name)){
        this.initPageBasedOnPath(path, false)
      }
    },
    brightness: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    contrast: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    vibrance: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    hue: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    saturation: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    red: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    blue: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    green: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    smooth: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    sepia: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    noise: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    ink: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal(shapeImg)
    },
    rotation: function (newValue, oldValue) {
      this.applyShapeChanges('cropper')
    },
    sizeX: function (newValue, oldValue) {
      this.applyShapeChanges('cropper')
    },
    sizeY: function (newValue, oldValue) {
      this.applyShapeChanges('cropper')
    },
    straightening: function (newValue, oldValue) {
      this.changeStateButton('Straightening')
    },
    cropping: function (newValue, oldValue) {
      this.changeStateButton('Cropping')
    },
    straightenAmount: function (newValue, oldValue) {
      this.applyShapeChanges('cropper')
    }
  },
  data() {
    return {
    }
  },
  methods: {
    resizeCheck () {
      //in this function we want to ask whether the window size has changed enough to constitute changing device modes
      //since device modes are based on innerWidth, we just reset the mode based on that and the functionality/viewport will still be usable.
      //then we want to reset the mode and call initPageBasedOnPath
      if ((isDesktop(this.getWindowWidth()) && this.desktopMode == false)
          || (isTablet(this.getWindowWidth()) && this.tabletMode == false)
          || (isMobile(this.getWindowWidth()) && this.mobileMode == false)
          || (isLargeDesktop(this.getWindowWidth()) && this.largeDesktopMode == false)
          || (isUltraWide(this.getWindowWidth()) && this.ultrawideMode == false)) {
            //only reset if device mode has changed.
        this.setDeviceMode()
        this.setContainerDimensions()
        const path = this.$route.name;
        this.initPageBasedOnPath(path, false)
      }
    },
    getLandingImgURL () {
      //get landing image based on device mode
      var imgURL;
      if(this.desktopMode || this.ultrawideMode || this.largeDesktopMode){
        //desktop
        imgURL = require('@/assets/img/desktop/manWCatDesktop.jpg')
      } else if (this.tabletMode){
        //tablet
        imgURL = require('@/assets/img/tablet/manWCatTablet.jpg')
      } else if (this.mobileMode) {
        //mobile
        imgURL = require('@/assets/img/mobile/manWCatMobile.jpg')
      }
      return imgURL
    },
    setContainerDimensions () {
      if(this.desktopMode || this.ultrawideMode || this.largeDesktopMode){
        //desktop
        this.$store.dispatch('setContainerHeight', IMAGE_HEIGHT)
        this.$store.dispatch('setContainerWidth', this.getPercentOfScreenVal(DESKTOP_CANVAS_PERCENT))
      } else if (this.tabletMode){
        //tablet
        this.$store.dispatch('setContainerHeight', MOBILE_IMAGE_HEIGHT)
        this.$store.dispatch('setContainerWidth', this.getPercentOfScreenVal(DESKTOP_CANVAS_PERCENT))
      } else if (this.mobileMode) {
        //mobile
        this.$store.dispatch('setContainerHeight', MOBILE_IMAGE_HEIGHT)
        this.$store.dispatch('setContainerWidth', this.getPercentOfScreenVal(MOBILE_CANVAS_PERCENT))
      }
    },
    falseAllDeviceModes () {
      this.$store.dispatch('setDesktopMode', false)
      this.$store.dispatch('setTabletMode', false)
      this.$store.dispatch('setMobileMode', false)
      this.$store.dispatch('setLargeDesktopMode', false)
      this.$store.dispatch('setUltrawideMode', false)
    },
    setDeviceMode () {
      //set all false
      //we need this on resize
      this.falseAllDeviceModes()
      if (isDesktop(this.getWindowWidth())) {
        //desktop
        this.$store.dispatch('setDesktopMode', true)
      } else if (isTablet(this.getWindowWidth())) {
        //tablet
        this.$store.dispatch('setTabletMode', true)
      } else if (isMobile(this.getWindowWidth())) {
        //mobile
        this.$store.dispatch('setMobileMode', true)
      } else if (isLargeDesktop(this.getWindowWidth())) {
        // large desktop mode
        this.$store.dispatch('setLargeDesktopMode', true)
      } else if (isUltraWide(this.getWindowWidth())) {
        // ultra wide mode
        this.$store.dispatch('setUltrawideMode', true)
      }
    },
    glfxToGlfx (toRouteName, fromRouteName) {
      if ((toRouteName === 'light' && fromRouteName === 'color')
      || (toRouteName === 'color' && fromRouteName === 'light')) {
        return true
      }
      return false
    },
    initPageBasedOnPath (path, newImage) {
      switch(path){
        case "color":
          this.initWebGLCanvas(newImage)
          break
        case "light":
          this.initWebGLCanvas(newImage)
          break
        case "shape":
          this.initCropperjsCanvas(newImage)
          break
      }
    },
    eventsHandler (eventDetails) {
      if (eventDetails.eventType === "Shape Button") {
        //shape buttons
        this.changeStateButton(eventDetails.eventName)
        this.saveShapeChangesToStorage()
      } else if (eventDetails.eventType === "Done Changing Shape") {
        //shape sliders/number inputs
        this.applyAllShapeChanges('storageCropper')
        this.saveShapeChangesToStorage()
        //we notify GA here bc we only want to send one event
        sendGA4PhotoEditEvent(this, eventDetails.eventName)
      }
    },
    applyAllShapeChanges (cropper) {
      this.applyShapeChanges(cropper)
      if (this.cropped) {
        this.applyCropChanges(cropper)
      } else if (this.straightened) {
        this.initStraightenWindow(cropper)
      }
    },
    getWindowWidth () {
      return window.innerWidth;
    },
    undoAll () {
      this.resetFilterShapeVals()
      const path = this.$route.name;
      //waiting for images to load
      this.initPageBasedOnPath(path, true)
      sendGA4FileEvent(this, 'Undo All')
    },
    changeOriginalVisible () {
      this.$store.dispatch('setOriginalVisible', !this.originalVisible)
      sendGA4FileEvent(this, 'Original Visible')
    },
    resetFilterShapeVals () {
      //light/effects stuff
      this.$store.dispatch('setBrightness', this.defaultBrightness)
      this.$store.dispatch('setContrast', this.defaultContrast)
      this.$store.dispatch('setSmooth', this.defaultSmooth)
      this.$store.dispatch('setSepia', this.defaultSepia)
      this.$store.dispatch('setNoise', this.defaultNoise)
      this.$store.dispatch('setInk', this.defaultInk)
      //color
      this.$store.dispatch('setVibrance', this.defaultVibrance)
      this.$store.dispatch('setHue', this.defaultHue)
      this.$store.dispatch('setSaturation', this.defaultSaturation)
      this.$store.dispatch('setRed', this.defaultRed)
      this.$store.dispatch('setBlue', this.defaultBlue)
      this.$store.dispatch('setGreen', this.defaultGreen)
      //shape
      this.$store.dispatch('setSizeX', this.defaultSizeX)
      this.$store.dispatch('setSizeY', this.defaultSizeY)
      this.$store.dispatch('setRotation', this.defaultRotation)
      this.$store.dispatch('setCropping', this.defaultCropping)
      this.$store.dispatch('setCropped', this.defaultCropped)
      this.$store.dispatch('setStraightening', this.defaultStraightening)
      this.$store.dispatch('setStraightened', this.defaultStraightened)
      this.$store.dispatch('setStraightenAmount', this.defaultStraightenAmount)
    },
    submit (e) {
      //delete old canvas
      //for re-uploading
      //first check if valid file format/save file format
      const file = e.target.files[0];
      this.$store.dispatch('setImgFileName', file.name)
      const fileExt = file.name.split('.').pop();
      // never trust the data!
      if (fileExt === "png" || fileExt === "PNG") {
        this.$store.dispatch('setImgFileExt', "image/png")
      } else if (fileExt === "jpg" || fileExt === "jpeg" || fileExt === "JPG" || fileExt === "JPEG") {
        this.$store.dispatch('setImgFileExt', "image/jpeg")
      } else {
        alert('Sorry, only jpg/jpeg/pngs accepted currently.')
        return
      }
      this.resetFilterShapeVals()
      this.removeCanvasIfExists()

      const reader = new FileReader();
      const img = new Image();
      const ref = this
      img.addEventListener("load", function () {
        const path = ref.$route.name;
        //we want to change this here so we can avoid an if down the road.
        const canvas = ref.getGLFXCanvas()
        const context = ref.getWebGLCanvasContext(canvas)
        const shapeImgElem = document.getElementById('shapeImg')
        const texture = ref.getGLFXTexture(canvas, shapeImgElem)
        const texturedCanvas = ref.applyTextureToGLFXCanvas(canvas, texture)
        ref.$store.dispatch('setOriginalImgCanvas', texturedCanvas)
        ref.$store.dispatch('setOriginalImgTexture', texture)
        ref.$store.dispatch('setOriginalCanvasContext', context)
        ref.initPageBasedOnPath(path, true)
        const aspectRatio = this.width / this.height;
        ref.$store.dispatch('setOriginalAspectRatio', aspectRatio)
      }, false);

      reader.addEventListener("load", function () {
        //filter img does not get resized, as it is not displayed, except on cropper js, which doesnt care about size.
        ref.$store.dispatch('setFilterImg', reader.result)
        ref.$store.dispatch('setOriginalImg', reader.result)
        //first lets set our display img
        ref.$store.dispatch('setDisplayImg', reader.result)
        //also setting shape img here apparently
        ref.$store.dispatch('setShapeImg', reader.result)
        ref.$store.dispatch('setUploaded', true)
        //set download
        img.src = reader.result;
      }, false);

      //need this
      reader.readAsDataURL(file)
      sendGA4FileEvent(this, 'Uploaded Image')
    },
    getPercentOfScreenVal (percent){
      const width  = this.getWindowWidth()
      return width * percent
    },
    getGLFXCanvas () {
      const canvas = glfx.canvas();
      return canvas
    },
    getWebGLCanvasContext (canvas) {
      const gl = canvas.getContext('webgl');
      gl.getExtension('WEBGL_color_buffer_float');
      return gl
    },
    getGLFXTexture (canvas, img) {
      return canvas.texture(img)
    },
    applyTextureToGLFXCanvas (canvas, texture) {
      canvas.draw(texture).update()
      return canvas
    },
    flipGLCanvasIfNeeded (context, canvas) {
      if (isWebitRenderEngine(window.navigator.vendor)) {
        context.setTransform(1, 0, 0, -1, 0, canvas.height);
        context.drawImage(canvas, 0, 0);
      }
    },
    applyFilters (canvas, texture) {
      canvas.draw(texture).update()
      if (this.brightness != this.defaultBrightness || this.contrast != this.defaultContrast) {
        canvas.draw(texture).brightnessContrast((this.brightness), (this.contrast)).update()
      }

      if (this.vibrance != this.defaultVibrance) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).vibrance((this.vibrance)).update()
      }

      if (this.hue != this.defaultHue || this.saturation != this.defaultSaturation) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).hueSaturation((this.hue), (this.saturation)).update()
      }

      if (this.red != this.defaultRed ||
          this.green != this.defaultGreen ||
          this.blue != this.defaultBlue) {
        //colors!
        texture.loadContentsOf(canvas);
        canvas.draw(texture).curves([[0,0], [.25, .25 - this.red], [.75, .75 + this.red], [1,1]],
                                    [[0,0], [.25, .25 - this.green], [.75, .75 + this.green], [1,1]],
                                    [[0,0], [.25, .25 - this.blue], [.75, .75 + this.blue], [1,1]]).update()
      }

      if (this.smooth != this.defaultSmooth) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).denoise(this.smooth).update()
      }

      if (this.sepia != this.defaultSepia) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).sepia(this.sepia).update()
      }

      if (this.noise != this.defaultNoise) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).noise(this.noise).update()
      }

      if (this.ink != this.defaultInk) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).ink(this.ink).update()
      }
      return canvas
    },
    applyShapeChanges (cropperName) {
      this.$refs[cropperName].rotateTo(this.rotation);
      //for cropper window
      this.$refs[cropperName].scale(this.sizeX * .01, this.sizeY * .01)
      //straightening last
      if (this.straightening || this.straightened) {
        this.$refs[cropperName].rotateTo(this.straightenAmount)
        this.$refs[cropperName].scale(1 + (.021 * Math.abs(this.straightenAmount)))
      }
    },
    applyCropChanges(cropper) {
      this.$refs[cropper].initCrop()
      this.$refs[cropper].setCropBoxData({
        "left": this.cropBoxLeft,
        "top": this.cropBoxTop,
        "width": this.cropBoxWidth,
        "height": this.cropBoxHeight
      })
    },
    changeStateButton (property) {
      //set shape states on cropper
      if (property === "Aspect Ratio") {
        this.initCropBoxWindow('cropper')
        this.saveCropBoxCanvasData()
      }

      if (property === "Flip Horizontally"){
        this.$store.dispatch('setSizeX', -1 * this.sizeX)
        this.applyShapeChanges('cropper')
      } else if (property === "Flip Vertically") {
        this.$store.dispatch('setSizeY', -1 * this.sizeY)
        this.applyShapeChanges('cropper')
      }

      //cropping handled here
      if (this.cropping && property === "Cropping") {
        this.initCropBoxWindow('cropper')
      }

      if (this.cropping) {
        if (property === 'Save') {
          this.$store.dispatch('setCropping', false)
          this.$store.dispatch('setCropped', true)
          this.saveCropBoxData()
        } else if (property === 'Cancel') {
          this.$refs.cropper.clear()
          //need to get image dave, save it, re init crop window
          this.saveCropBoxCanvasData()
          this.$store.dispatch('setCropping', false)
          this.$store.dispatch('setCropped', false)
        }
        this.applyCropChanges('storageCropper')
      }

      if (this.straightening) {
        if (property === 'Save') {
          this.$store.dispatch('setStraightened', true)
          this.$store.dispatch('setStraightening', false)
        } else if (property === 'Cancel') {
          //reset cropper
          this.$refs.cropper.clear()
          this.$store.dispatch('setStraightenAmount', 0)
          this.applyShapeChanges('storageCropper')
          //save new img deets
          this.saveStraightenCanvasData()
          this.$store.dispatch('setStraightened', false)
          this.$store.dispatch('setStraightening', false)
        }
        this.initStraightenWindow('storageCropper')
      }

      //this is just a state change
      if (this.straightening && property === "Straightening") {
        this.initStraightenWindow('cropper')
      }
    },
    updateFilterVal (img) {
      this.originalImgTexture.loadContentsOf(img)
      const imgBucket = document.getElementById('imgBucket');
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      if (oldCanvas) {
        imgBucket.removeChild(oldCanvas);
      }
      imgBucket.insertBefore(this.applyFilters(this.originalImgCanvas, this.originalImgTexture), filterImg)
    },
    initWebGLCanvas (newImage) {
      //remove cropper
      const ref = this;
      this.$store.dispatch('setCropperVisible', false)
      this.removeCanvasIfExists()

      //need to be visible at time of initalization or replace
      if (newImage) {
        this.$store.dispatch('setStorageCropperVisible', true)
        this.$refs.storageCropper.replace(this.displayImg);
      }

      //this is probably not loaded yet, but we need wait if we want real dimensions.
      setTimeout(function() {
        const shapeImgElem = document.getElementById('shapeImg')
        const width = shapeImgElem.width;
        const height = shapeImgElem.height;
        if (ref.imgTooBig(width, height, ref)) {
          //use output cropper for resizing
          //we clean up output cropper at the end anyways
          ref.fitImgToCanvas(ref.shapeImg, 'outputCropper', width, height, ref)
          setTimeout(function() {
            //resize img to canvas
            const resizedShapeImg = ref.$refs.outputCropper.getCroppedCanvas().toDataURL('image/jpeg', 1)
            ref.$store.dispatch('setShapeImg', resizedShapeImg)
            setTimeout(function() {
              ref.updateFilterVal(shapeImg)
              if (newImage) {
                ref.$store.dispatch('setStorageCropperVisible', false)
              }
            }, IMAGE_LOAD_TIME);
          }, IMAGE_LOAD_TIME);
        } else {
          ref.updateFilterVal(shapeImg)
          if (newImage) {
            ref.$store.dispatch('setStorageCropperVisible', false)
          }
        }
      }, IMAGE_LOAD_TIME);
    },
    initCropperjsCanvas (newImage) {
      this.removeCanvasIfExists()
      this.$store.dispatch('setCropperVisible', true)

      //need to be visible at time of initalization or replace
      if (newImage) {
        this.$store.dispatch('setStorageCropperVisible', true)
        this.$refs.storageCropper.replace(this.displayImg);
      }

      this.$refs.cropper.replace(this.filterImg);
      this.$refs.outputCropper.replace(this.originalImg);
      const ref = this
      setTimeout(function() {
        ref.applyShapeChanges('cropper')
        //FIRST SAVE DATA
        //want to initialize cropbox default values if we havent yet.
        if (ref.straightenCropBoxTop === false) {
          ref.saveStraightenCanvasData()
        }
        //do the same for crop box data
        if (ref.cropBoxTop === false) {
          ref.saveCropBoxCanvasData()
        }

        if (newImage) {
          //need these to be reset after uploading img
          ref.saveStraightenCanvasData()
          ref.saveCropBoxCanvasData()
        }

        //NEXT, APPLY THAT DATA TO THE CROPPER
        //order MATTERS here, straighening takes precedence over cropping
        if (ref.cropped === true) {
          ref.initCropBoxWindow('cropper')
        }

        if (ref.straightened === true) {
          ref.initStraightenWindow('cropper')
        }

        if (newImage) {
          ref.$store.dispatch('setStorageCropperVisible', false)
        }
      }, IMAGE_LOAD_TIME)
    },
    removeCanvasIfExists () {
      const canvi = document.getElementsByTagName("canvas");
      if (canvi.length > 0){
        const imgBucket = document.getElementById('imgBucket');
        const oldCanvas = canvi[0];
        imgBucket.removeChild(oldCanvas)
      }
    },
    saveShapeChangesToStorage () {
      //shape changes should have already been applied
      const ref = this;
      setTimeout(function() {
        const newShapeImg = ref.$refs.storageCropper.getCroppedCanvas().toDataURL(ref.imgFileExt, 1)
        ref.$store.dispatch('setShapeImg', newShapeImg)
      }, IMAGE_LOAD_TIME);
    },
    doneChangingFilter (filterName) {
      const canvas = this.getGLFXCanvas()
      const context = this.getWebGLCanvasContext(canvas)
      const originalImgElem = document.getElementById('originalImg')
      const texture = this.getGLFXTexture(canvas, originalImgElem)
      const texturedCanvas = this.applyTextureToGLFXCanvas(canvas, texture)
      const newFilterImg = this.applyFilters(texturedCanvas, texture).toDataURL(this.imgFileExt, 1)
      this.$store.dispatch('setFilterImg', newFilterImg)
      //then hit GA4 with the great news!
      sendGA4PhotoEditEvent(this, filterName)
    },
    saveStraightenCanvasData () {
      const cropperCanData = this.$refs.cropper.getCanvasData()
      //save canvas data
      this.$store.dispatch('setStraightenCropBoxData', cropperCanData)
    },
    saveCropBoxCanvasData () {
      const cropperCanData = this.$refs.cropper.getCanvasData()
      //save canvas data
      this.$store.dispatch('setCropBoxData', cropperCanData)
    },
    initStraightenWindow (cropper) {
      this.$refs[cropper].initCrop()
      this.$refs[cropper].setCropBoxData({
        "left": this.straightenCropBoxLeft,
        "top": this.straightenCropBoxTop,
        "width": this.straightenCropBoxWidth,
        "height": this.straightenCropBoxHeight
      })
    },
    saveCropBoxData () {
      const cropBoxData = this.$refs.cropper.getCropBoxData()
      //save canvas data
      this.$store.dispatch('setCropBoxData', cropBoxData)
    },
    initCropBoxWindow (cropper) {
      this.$refs[cropper].initCrop()
      this.$refs[cropper].setCropBoxData({
        "left": this.cropBoxLeft,
        "top": this.cropBoxTop,
        "width": this.cropBoxWidth,
        "height": this.cropBoxHeight
      })
    },
    imgTooBig (imgWidth, imgHeight, vueRef) {
      if (imgWidth > vueRef.containerWidth || imgHeight > vueRef.containerHeight) {
        return true
      }
      return false
    },
    fitImgToCanvas (newImgURL, cropperRef, width, height, vueRef) {
      //takes in an image id, loads
      //submit call is a flag for when we are calling this function
      //on submit image
      vueRef.$refs[cropperRef].replace(newImgURL);
      const newWidthRatio = vueRef.containerWidth / width;
      const newHeightRatio = vueRef.containerHeight / height;
      const ratioToUse = Math.min(newWidthRatio, newHeightRatio)

      setTimeout(function() {
        vueRef.$refs[cropperRef].scale(ratioToUse, ratioToUse)
      }, IMAGE_LOAD_TIME)
    },
    prepOutput () {
      //take in original (unsized) img
      //apply all filter changes
      const originalImg = document.getElementById('originalImg')
      const canvas = this.getGLFXCanvas()
      const context = this.getWebGLCanvasContext(canvas)
      const originalImgElem = document.getElementById('originalImg')
      const texture = this.getGLFXTexture(canvas, originalImgElem)
      const texturedCanvas = this.applyTextureToGLFXCanvas(canvas, texture)

      var originalImgWFilters = this.applyFilters(texturedCanvas, texture).toDataURL()
      // upload to output cropper

      //***** FILTERS MUST BE BEFORE SHAPE ******//
      this.$store.dispatch('setOutputVisible', true)
      this.$refs.outputCropper.replace(originalImgWFilters)
      const ref = this;
      setTimeout(function() {
        //apply rotation, size, cropping
        ref.applyAllShapeChanges('outputCropper')
        setTimeout(function() {
          saveAs(ref.$refs.outputCropper.getCroppedCanvas().toDataURL(ref.imgFileExt, 1), ref.imgFileName)
          ref.$store.dispatch('setOutputVisible', false)
        }, IMAGE_LOAD_TIME);
      }, IMAGE_LOAD_TIME);
      //we should now have all alterations accounted for at this point.
      sendGA4FileEvent(this, 'Downloaded Image')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbarOffset {
    margin-top: 51px !important;
  }

  .main-title {
    font-size: 3rem !important;
  }

  .desktopControls {
    padding-top: 20px;
    position: fixed;
    /* left: 80%; */
    right: 3%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
    max-width: 16%;
  }

  .largeDesktopControls {
    padding-top: 20px;
    position: fixed;
    /* left: 80%; */
    right: 10%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
    max-width: 16%;
  }

  .ultrawideControls {
    padding-top: 20px;
    position: fixed;
    /* left: 80%; */
    right: 22%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
    max-width: 16%;
  }

  .tabletControls {
    padding-top: 70px;
    position: fixed;
    left: 74%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
    padding-right: 3%;
    max-width: 16%;
  }

  .desktopCanvasOffset {
    margin-left: 1%;
  }

  .file-cta:hover {
    background-color: white !important;
    color: black !important;
  }

  .customCanvasOverlayUltrawide {
    position: absolute;
    top: 300px;
    left: 33%;
    z-index: 1;
  }

  .customCanvasOverlayLargeDesktop {
    position: absolute;
    top: 300px;
    left: 27%;
    z-index: 1;
  }

  .customCanvasOverlayDesktop {
    position: absolute;
    top: 300px;
    left: 20%;
    z-index: 1;
  }

  .custom-canvas-overlay-tablet {
    position: absolute;
    top: 200px;
    z-index: 1;
    width: 73.5%;
    text-align: center;
  }

  .custom-canvas-overlay-mobile {
    position: absolute;
    top: 100px;
    z-index: 1;
    width: 100%;
    text-align: center;
  }

  .desktop-img-bucket {
    height: 700px;
  }

  .columns {
    margin: 0;
  }

  .hiddenCropperStyling {
    position: absolute;
    top: 1000px;
  }

  .ultrawideOffset {
    margin-left: 22%;
  }

  .largeDesktopOffset {
    margin-left: 10%;
  }

  .desktopOffset {
    margin-left: 0%;
  }
</style>
