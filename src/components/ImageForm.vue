<template>
  <!-- mobile version of dom -->
  <div v-if="desktopMode == false">
    <div v-if="uploaded" class="columns is-centered navbar-offset">
      <div class="column is-three-quarters">
        <section class="container has-text-centered">
          <div class="columns mt-6 mb-6">
            <div class="column">
              <div class="file is-primary is-centered">
                <label class="file-label">
                  <input class="file-input" type="file" name="photo" @change="submit">
                  <span class="file-cta has-background-black">
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div class="column" v-show="uploaded">
              <button v-if="originalVisible" class="button is-black" @click="originalVisible = !originalVisible">Hide Original</button>
              <button v-else class="button is-black" @click="originalVisible = !originalVisible">Show Original</button>
            </div>
            <div class="column" v-show="uploaded">
              <button id="downloadButton" @click="prepOutput()" class="button is-black">Download Copy</button>
            </div>
            <div class="column" v-show="uploaded">
              <button id="downloadButton" @click="undoAll()" class="button is-black">Undo All</button>
            </div>
          </div>
          <div class="mt-5">
            <img id="displayImg" v-show="originalVisible" :src="displayImg"/>
            <img id="originalImg" v-show="false" :src="originalImg"/>
          </div>
          <div id="imgBucket" class="mt-5">
            <!-- reuse this bad boi for holding on to changes in updateFilterVal -->
            <img id="shapeImg" class="hidden" :src="shapeImg"/>
            <img id="filterImg" class="hidden" :src="filterImg"/>
            <VueCropper ref="cropper" :autoCropArea="cropping.defaultSize" :autoCrop="cropping" v-show="cropperVisible" :minContainerWidth="containerWidth" :minContainerHeight="containerHeight" alt="Cropping Img" @cropend="doneChangingShape"></VueCropper>
            <VueCropper ref="storageCropper" :autoCropArea="2" :autoCrop="false" alt="Cropping storage Img" v-show="false" :minContainerWidth="containerWidth" :minContainerHeight="containerHeight"></VueCropper>
            <VueCropper ref="outputCropper" :autoCropArea="2" :autoCrop="false" v-show="outputVisible" :minContainerWidth="containerWidth" :minContainerHeight="containerHeight"></VueCropper>
          </div>
          <div v-show="uploaded" class="has-text-centered pl-5 pr-5">
            <router-view/>
          </div>
        </section>
      </div>
    </div>
    <!-- not yet uploaded to mobile -->
    <div v-else class="columns mobile-placeholder navbar-offset">
      <div class="column is-three-quarters">
        <section class="hero is-primary is-large header-image">
            <!-- Hero content: will be in the middle -->
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title has-text-white">
                        Transform Your Images
                    </h1>
                      <div class="file is-primary is-centered">
                        <label class="file-label">
                          <input class="file-input" type="file" name="photo" @change="submit">
                          <span class="file-cta has-background-black">
                            <span class="file-label">
                              Choose a file…
                            </span>
                          </span>
                        </label>
                      </div>
                </div>
            </div>
        </section>
      </div>
      <div class="column">
        <div class="has-text-centered pl-5 pr-5">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <!--desktop-->
    <div v-show="uploaded" class="columns is-centered navbar-offset">
      <div class="column">
        <section class="has-text-centered">
          <div class="columns">
            <div class="column desktopCanvasOffset is-three-quarters">
              <div>
                <img id="displayImg" v-show="originalVisible" :src="displayImg"/>
                <img id="originalImg" v-show="false" :src="originalImg"/>
              </div>
              <div id="imgBucket">
                <!-- reuse this bad boi for holding on to changes in updateFilterVal -->
                <img id="shapeImg" class="hidden" :src="shapeImg"/>
                <img id="filterImg" class="hidden" :src="filterImg"/>
                <VueCropper ref="cropper" :autoCropArea="cropping.defaultSize" :autoCrop="cropping" v-show="cropperVisible" :minContainerWidth="containerWidth" :minContainerHeight="containerHeight" alt="Cropping Img" @cropend="doneChangingShape"></VueCropper>
                <VueCropper ref="storageCropper" :autoCropArea="2" :autoCrop="false" alt="Cropping storage Img" v-show="false" :minContainerWidth="containerWidth" :minContainerHeight="containerHeight"></VueCropper>
                <VueCropper ref="outputCropper" :autoCropArea="2" :autoCrop="false" v-show="outputVisible" :minContainerWidth="containerWidth" :minContainerHeight="containerHeight"></VueCropper>
              </div>
            </div>
            <div class="column mt-6" v-show="uploaded">
              <div class="file is-primary is-centered">
                <label class="file-label">
                  <input class="file-input" type="file" name="photo" @change="submit">
                  <span class="file-cta has-background-black">
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                </label>
              </div>
              <div class="is-centered mt-5">
                <button v-if="originalVisible" class="button is-black" @click="originalVisible = !originalVisible">Hide Original</button>
                <button v-else class="button is-black" @click="originalVisible = !originalVisible">Show Original</button>
              </div>
              <div class="is-centered mt-5">
                <button id="downloadButton" @click="prepOutput()" class="button is-black">Download Copy</button>
              </div>
              <div class="is centered mt-5 mb-5" v-show="uploaded">
                <button id="downloadButton" @click="undoAll()" class="button is-black">Undo All</button>
              </div>
              <div class="desktopControls pr-5">
                <router-view/>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- <div v-else class="columns is-centered placeholder">
      <div class="column is-three-quarters">
        <section class="container has-text-centered">
          <div class="columns mt-4">
            <div class="column">

            </div>
          </div>
        </section>
      </div>
    </div> -->

    <!-- Not uploaded/editing yet -->
    <div v-show="!uploaded" class="columns desktopCanvasOffset navbar-offset">
        <div class="column is-three-quarters">
          <section class="hero is-primary is-large header-image">
              <div class="hero-body">
                  <div class="container has-text-centered">
                      <h1 class="title has-text-white main-title">
                          Transform Your Images
                      </h1>
                        <div class="file is-primary is-centered">
                          <label class="file-label">
                            <input class="file-input" type="file" name="photo" @change="submit">
                            <span class="file-cta has-background-black">
                              <span class="file-label">
                                Choose a file…
                              </span>
                            </span>
                          </label>
                        </div>
                  </div>
              </div>
          </section>
        </div>
        <div class="column is-one-quarter">
          <div class="desktopControls has-text-centered pr-5">
            <router-view/>
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

//max width is 75% of screen
const IMAGE_HEIGHT = screen.height - 200;
const MOBILE_CANVAS_PERCENT = .8;
const DESKTOP_CANVAS_PERCENT = .7;
//how long we wait for an image to load before doing work
const IMAGE_LOAD_TIME = 150;

export default {
  name: 'ImageForm',
  emits: ['updateColorVal', 'updateShapeVal'],
  created(){
    //redirect to light transformations
    //no landing page
    if(this.getWindowWidth() > 1100){
      //desktop
      console.log('thinks that screen is big')
      this.$store.dispatch('setDesktopMode', true)
      this.$store.dispatch('setContainerWidth', this.getPercentOfScreenVal(DESKTOP_CANVAS_PERCENT))
    } else {
      console.log('thinks we"re on mobile')
      this.$store.dispatch('setDesktopMode', false)
      this.$store.dispatch('setContainerWidth', this.getPercentOfScreenVal(MOBILE_CANVAS_PERCENT))
    }
  },
  components: {
    VueCropper,
    //VueSlickCarousel
  },
  props: {
    msg: String
  },
  computed: {
    desktopMode: function () {
      return this.$store.state.desktopMode
    },
    originalImg: function () {
      return this.$store.state.originalImg
    },
    originalVisible: function () {
      return this.$store.state.originalVisible
    },
    // img: null,
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
    imgFileExt: function () {
      return this.$store.state.imgFileExt
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
      return this.$store.state.red
    },
    blue: function () {
      return this.$store.state.blue
    },
    green: function () {
      return this.$store.state.green
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
      console.log(this.uploaded)
      if (this.uploaded) {
        const path = to.path;
        console.log(path)
        switch(path){
          case "/transformations/color":
            this.initWebGLCanvas()
            break
          case "/transformations/light":
            this.initWebGLCanvas()
            break
          case "/transformations/shape":
            console.log('thinks we should init shape')
            this.initCropperjsCanvas()
            break
        }
      }
    },
    brightness: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    contrast: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    vibrance: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    hue: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    saturation: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    red: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    blue: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    green: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    smooth: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    sepia: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    noise: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    ink: function (newValue, oldValue) {
      //need to call updateFilterVal with new value
      this.updateFilterVal()
    },
    rotation: function (newValue, oldValue) {
      this.applyShapeChanges('cropper')
    },
    size: function (newValue, oldValue) {
      this.applyShapeChanges('cropper')
    },
    straightening: function (newValue, oldValue) {
      this.changeStateButton('Straigtening')
    }
  },
  // data() {
  //   return {
  //
  //   }
  // },
  methods: {
    capitalizeFirstLetter(string) {
      console.log(string)
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getWindowWidth(){
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    },
    undoAll(){
      this.resetFilterShapeVals()
      const path = this.$route.name;
      //waiting for images to load
      switch (path) {
        case "color":
          this.initWebGLCanvas()
          break
        case "light":
          this.initWebGLCanvas()
          break
        case "shape":
          this.initCropperjsCanvas()
          break
      }
    },
    resetFilterShapeVals(){
      console.log('called reset filter shape vals')
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
      //this.size = this.defaultSize;
      this.$store.dispatch('setSizeX', this.defaultSizeX)
      this.$store.dispatch('setSizeY', this.defaultSizeY)
      this.$store.dispatch('setRotation', this.defaultRotation)
      this.$store.dispatch('setCropping', this.defaultCropping)
      this.$store.dispatch('setCropped', this.defaultCropped)
      this.$store.dispatch('setStraightening', this.defaultStraightening)
      this.$store.dispatch('setStraightened', this.defaultStraigtened)
      this.$store.dispatch('setStraighten', this.defaultStraightenAmount)
    },
    submit(e) {
      //delete old canvas
      //for re-uploading
      //first check if valid file format/save file format
      const file = e.target.files[0];
      this.$store.dispatch('setImgFileName', file.name)
      const fileExt = file.name.split('.').pop();
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
      console.log(this.$refs)
      img.addEventListener("load", function () {
        console.log('thinks img loaded')
        //always fit it to the canvas. We use the original img on download.
        ref.fitImgToCanvas(reader.result, 'cropper', this, ref)
        console.log('got through fitting')
        const path = ref.$route.name;
        //waiting for images to load
        setTimeout(function() {
          //first lets set our display img
          //now that we have successfully resized.
          const displayImg = ref.$refs['cropper'].getCroppedCanvas().toDataURL(ref.imgFileExt, 1)
          ref.$store.dispatch('setDisplayImg', displayImg)
          //also setting shape img here apparently
          ref.$store.dispatch('setShapeImg', displayImg)
          switch (path) {
            case "color":
              ref.initWebGLCanvas()
              break
            case "light":
              ref.initWebGLCanvas()
              break
            case "shape":
              ref.initCropperjsCanvas()
              break
          }
        }, IMAGE_LOAD_TIME);
        const aspectRatio = this.width / this.height;
        ref.$store.dispatch('setOriginalAspectRatio', aspectRatio)
      }, false);

      reader.addEventListener("load", function () {

        //filter img does not get resized, as it is not displayed, except on cropper js, which doesnt care about size.
        ref.$store.dispatch('setFilterImg', reader.result)
        ref.$store.dispatch('setOriginalImg', reader.result)
        ref.$store.dispatch('setUploaded', true)
        //set download
        console.log('about to set img src')
        img.src = reader.result;
        //collect garbage
        //ref.img = reader.result;
      }, false);

      //need this
      reader.readAsDataURL(file)
    },
    updateColorVal(newVal){
      this.updateFilterVal(newVal);
    },
    updateLightVal(newVal){
      this.updateFilterVal(newVal);
    },
    getPercentOfScreenVal(percent){
      const width  = this.getWindowWidth()
      return width * percent
    },
    getFilterCanvas(img){
      const canvas = glfx.canvas();
      const gl = canvas.getContext('webgl');
      gl.getExtension('WEBGL_color_buffer_float');

      const texture = canvas.texture(img);
      canvas.draw(texture).update()

      if (this.brightness !== this.defaultBrightness || this.contrast !== this.defaultContrast) {
        canvas.draw(texture).brightnessContrast((this.brightness * .01), (this.contrast * .01)).update();
      }

      if (this.vibrance !== this.defaultVibrance) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).vibrance((this.vibrance * .01)).update();
      }

      if (this.hue !== this.defaultHue || this.saturation !== this.defaultSaturation) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).hueSaturation((this.hue * .01), (this.saturation * .01)).update();
      }

      if (this.red !== this.defaultRed ||
          this.green !== this.defaultGreen ||
          this.blue !== this.defaultBlue) {
        //colors!
        texture.loadContentsOf(canvas);
        const redVal = this.red * .01;
        const blueVal = this.blue * .01;
        const greenVal = this.green * .01;
        canvas.draw(texture).curves([[0,0], [.25, .25 - redVal], [.75, .75 + redVal], [1,1]], [[0,0], [.25, .25 - greenVal], [.75, .75 + greenVal], [1,1]], [[0,0], [.25, .25 - blueVal], [.75, .75 + blueVal], [1,1]]).update();
      }

      if (this.smooth !== this.defaultSmooth) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).denoise(this.smooth).update();
      }

      if (this.sepia !== this.defaultSepia) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).sepia(this.sepia * .01).update();
      }

      if (this.noise !== this.defaultNoise) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).noise(this.noise * .01).update();
      }

      if (this.ink !== this.defaultInk) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).ink(this.ink * .01).update();
      }
      texture.destroy();
      return canvas
    },
    //still need this
    applyShapeChanges(cropperName){
      this.$refs[cropperName].rotateTo(this.rotation);
      this.$refs[cropperName].scaleX(this.size * .01)
      this.$refs[cropperName].scaleY(this.size * .01)
      //this.$refs[cropperName].scale(this.size * .01, this.size * .01)
      if (this.straightening || this.straightened) {
        this.straighten(cropperName)
      }
    },
    //and still need this
    updateFilterVal(){
      //dont apply changes if no photo
      if (this.uploaded) {
        var shapeImg = document.getElementById('shapeImg')
        const imgBucket = document.getElementById('imgBucket');
        const oldCanvas = document.getElementsByTagName("canvas")[0];
        const displayCanvas = this.getFilterCanvas(shapeImg);

        imgBucket.removeChild(oldCanvas);
        imgBucket.insertBefore(displayCanvas, filterImg)
      }
    },
    initWebGLCanvas() {
      //remove cropper
      const ref = this;
      this.$store.dispatch('setCropperVisible', false)
      this.removeCanvasIfExists()

      if (ref.imgTooBig(shapeImg, ref)) {
        ref.fitImgToCanvas(this.shapeImg, 'storageCropper', shapeImg, ref)
      }

      setTimeout(function() {
        const shapeImgElem = document.getElementById('shapeImg')

        ref.$refs.storageCropper.replace(ref.displayImg);
        const canvas = ref.getFilterCanvas(shapeImgElem)
        shapeImgElem.parentNode.insertBefore(canvas, shapeImgElem);
      }, IMAGE_LOAD_TIME);
    },
    initCropperjsCanvas() {
      this.removeCanvasIfExists()
      this.$store.dispatch('setCropperVisible', true)
      this.$refs.cropper.replace(this.filterImg);
      this.$refs.storageCropper.replace(this.displayImg);
      this.$refs.outputCropper.replace(this.originalImg);
    },
    removeCanvasIfExists(){
      const canvi = document.getElementsByTagName("canvas");
      if (canvi.length > 0){
        const imgBucket = document.getElementById('imgBucket');
        const oldCanvas = canvi[0];
        imgBucket.removeChild(oldCanvas)
      }
    },
    doneChangingShape(){
      var displayImg = document.getElementById('displayImg')
      this.applyShapeChanges('storageCropper')
      this.shapeImg = this.$refs.storageCropper.getCroppedCanvas().toDataURL(this.imgFileExt, 1)
    },
    doneChangingFilter(){
      var originalImg = document.getElementById('originalImg')
      this.filterImg = this.getFilterCanvas(originalImg).toDataURL(this.imgFileExt, 1)
    },
    changeStateButton (stateToChange) {
      if (stateToChange === "Straightening") {
        this.straightening = !this.straightening
      }

      if (stateToChange === "Cropping") {
        //flip it!
        this.cropping = !this.cropping
      }

      if (stateToChange === "Aspect Ratio") {
        this.$refs.cropper.setAspectRatio(this.originalAspectRatio)
      }

      if (stateToChange === "Flip Along X"){
        this.sizeX = -1 * this.sizeX
        this.applyShapeChanges('cropper')
      } else if (stateToChange === "Flip Along Y") {
        this.sizeY = -1 * this.sizeY
        this.applyShapeChanges('cropper')
      }
      //ask if we are cropping
      this.changeCropState('cropper', stateToChange)
    },
    changeCropState(cropperName, state){
      //if we have yet to crop anything
      if (this.cropped === false) {
        if (this.straightening || this.cropping) {
          this.$refs[cropperName].initCrop()
        } else {
          this.$refs[cropperName].clear()
        }
      }

      if (this.cropping) {
        if (state === 'Save') {
          this.cropping = false
          this.cropped = true
          //this.prepOutput()
        } else if (state === 'Cancel') {
          this.$refs[cropperName].clear()
          this.cropping = false
          this.cropped = false
        }
      }

      if (this.straightening) {
        if (state === 'Save') {
          this.straightened = true
          //this.prepOutput()
          this.straightening = false
        } else if (state === 'Cancel') {
          this.$refs[cropperName].clear()
          this.straightenAmount = 0
          this.straighten('cropper')
          //this.prepOutput()
          this.straightening = false
          this.straightened = false
        }
      }

      if (this.straightening && state === "Straightening") {
        //need to set crop box to max
        const cropperData = this.$refs[cropperName].getCanvasData()
        this.$refs[cropperName].setCropBoxData({
          "left": cropperData['left'],
          "top": 0,
          "width": cropperData['width'],
          "height": cropperData['height']
        })
      }
    },
    imgTooBig(image, vueRef){
      if (image.width > vueRef.containerWidth || image.height > IMAGE_HEIGHT) {
        return true
      }
      return false
    },
    fitImgToCanvas(newImgURL, cropperRef, image, vueRef){
      console.log('called fit img to canvas')
      //takes in an image id, loads
      //submit call is a flag for when we are calling this function
      //on submit image
      vueRef.$refs[cropperRef].replace(newImgURL);
      const newWidthRatio = vueRef.containerWidth / image.width;
      const newHeightRatio = IMAGE_HEIGHT / image.height;
      const ratioToUse = Math.min(newWidthRatio, newHeightRatio)
      //need to make a copy
      setTimeout(function() {
        vueRef.$refs[cropperRef].scale(ratioToUse, ratioToUse)
        console.log('got through scaling')
      }, IMAGE_LOAD_TIME)
    },
    straighten(cropperName){
      //rotate and crop to fit as we rotate
      this.$refs[cropperName].rotateTo(this.straightenAmount)
      this.$refs[cropperName].scale(1 + (.021 * Math.abs(this.straightenAmount)))
    },
    prepOutput(){
      //take in original (unsized) img
      //apply all filter changes
      const originalImg = document.getElementById('originalImg')
      var originalImgWFilters = this.getFilterCanvas(originalImg).toDataURL()
      // upload to output cropper

      //***** THIS MUST BE BEFORE THIS ******//
      // CROPPER MUST BE VISIBLE AT TIME OF REPLACE()
      this.outputVisible = true
      this.$refs.outputCropper.replace(originalImgWFilters)

      const ref = this;
      setTimeout(function() {
        //apply rotation, size, cropping
        ref.applyShapeChanges('outputCropper')
        if (ref.cropped || ref.straightened){
          //need cropper info
          const cropperData = ref.$refs.cropper.getCropBoxData()
          console.log(cropperData)
          ref.$refs.outputCropper.initCrop()
          ref.img = ref.$refs.outputCropper.setCropBoxData({
            "left": cropperData['left'],
            "top": cropperData['top'],
            "width": cropperData['width'],
            "height": cropperData['height']
          })
        }
        setTimeout(function() {
          saveAs(ref.$refs.outputCropper.getCroppedCanvas().toDataURL(ref.imgFileExt, 1), ref.imgFileName)
          ref.outputVisible = false
        }, IMAGE_LOAD_TIME);
      }, IMAGE_LOAD_TIME);
      //we should now have all alterations accounted for at this point.
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar-offset{
    margin-top: 50px;
  }

  .main-title{
    font-size: 3rem !important;
  }

  .mobile-placeholder{
    height: 150vh;
  }

  .desktopControls{
    position: relative;
    top: 20px;
  }

  .desktopCanvasOffset{
    margin-left: 1%;
  }

  .header-image {
    background-image: url("~@/assets/img/catman copy.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #999;
  }

  .file-cta:hover{
    background-color: white !important;
    color: black !important;
  }
</style>
