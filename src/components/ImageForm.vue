<template>
  <!-- mobile version of dom -->
  <div v-if="desktopMode == false">
    <div v-if="uploaded" class="columns is-centered">
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
            <img id="originalDisplayImg" v-show="originalVisible" :src="originalDisplayImg"/>
            <img id="originalImg" v-show="false" :src="originalImg"/>
          </div>
          <div id="imgBucket" class="mt-5">
            <!-- reuse this bad boi for holding on to changes in updateFilterVal -->
            <img id="shapeImg" class="hidden" :src="shapeImg"/>
            <img id="filterImg" class="hidden" :src="filterImg"/>
            <VueCropper ref="cropper" :autoCropArea="cropping.defaultSize" :autoCrop="cropping.val" v-show="cropperVisible" :minContainerWidth="containerWidth" :minContainerHeight="containerHeight" alt="Cropping Img" @cropend="doneChangingShape"></VueCropper>
            <VueCropper ref="storageCropper" :autoCropArea="2" :autoCrop="false" alt="Cropping storage Img" v-show="false" :minContainerWidth="containerWidth" :minContainerHeight="containerHeight"></VueCropper>
            <VueCropper ref="outputCropper" :autoCropArea="2" :autoCrop="false" v-show="outputVisible" :minContainerWidth="containerWidth" :minContainerHeight="containerHeight"></VueCropper>
          </div>
          <div v-show="uploaded" class="has-text-centered pl-5 pr-5">
            <router-view
              @updateLightVal="updateLightVal"
              @updateColorVal="updateColorVal"
              @updateShapeVal="updateShapeVal"
              @doneChangingFilter="doneChangingFilter"
              @doneChangingShape="doneChangingShape"
              @changeStateButton="changeStateButton"
              :red="red.val"
              :green="green.val"
              :blue="blue.val"
              :brightness="brightness.val"
              :contrast="contrast.val"
              :vibrance="vibrance.val"
              :hue="hue.val"
              :saturation="saturation.val"
              :smooth="smooth.val"
              :rotation="rotation.val"
              :cropping="cropping.val"
              :size="size.val"
              :straightening="straightening.val"
              :sepia="sepia.val"
              :noise="noise.val"
              :ink="ink.val"
              :defaultStraightenAmount="defaultStraightenAmount.val"
              :defaultBrightness="defaultBrightness.val"
              :defaultContrast="defaultContrast.val"
              :defaultVibrance="defaultVibrance.val"
              :defaultHue="defaultHue.val"
              :defaultSaturation="defaultSaturation.val"
              :defaultRed="defaultRed.val"
              :defaultBlue="defaultBlue.val"
              :defaultGreen="defaultGreen.val"
              :defaultSmooth="defaultSmooth.val"
              :defaultRotation="defaultRotation.val"
              :defaultSize="defaultSize.val"
              :defaultSepia="defaultSepia.val"
              :defaultNoise="defaultNoise.val"
              :defaultInk="defaultInk.val"
            ></router-view>
          </div>
          <p class="mt-5" v-show="uploaded"><strong class="has-text-white">Please bookmark us!</strong></p>
        </section>
      </div>
    </div>
    <div v-else class="columns mobile-placeholder">
      <div class="column is-three-quarters">
        <section class="hero is-primary is-large header-image">
            <!-- Hero content: will be in the middle -->
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title has-text-black">
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
          <router-view
            @updateLightVal="updateLightVal"
            @updateColorVal="updateColorVal"
            @updateShapeVal="updateShapeVal"
            @doneChangingFilter="doneChangingFilter"
            @doneChangingShape="doneChangingShape"
            @changeStateButton="changeStateButton"
            :red="red.val"
            :green="green.val"
            :blue="blue.val"
            :brightness="brightness.val"
            :contrast="contrast.val"
            :vibrance="vibrance.val"
            :hue="hue.val"
            :saturation="saturation.val"
            :smooth="smooth.val"
            :rotation="rotation.val"
            :cropping="cropping.val"
            :size="size.val"
            :straightening="straightening.val"
            :sepia="sepia.val"
            :noise="noise.val"
            :ink="ink.val"
            :defaultStraightenAmount="defaultStraightenAmount.val"
            :defaultBrightness="defaultBrightness.val"
            :defaultContrast="defaultContrast.val"
            :defaultVibrance="defaultVibrance.val"
            :defaultHue="defaultHue.val"
            :defaultSaturation="defaultSaturation.val"
            :defaultRed="defaultRed.val"
            :defaultBlue="defaultBlue.val"
            :defaultGreen="defaultGreen.val"
            :defaultSmooth="defaultSmooth.val"
            :defaultRotation="defaultRotation.val"
            :defaultSize="defaultSize.val"
            :defaultSepia="defaultSepia.val"
            :defaultNoise="defaultNoise.val"
            :defaultInk="defaultInk.val"
          ></router-view>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <!--desktop-->
    <div v-if="uploaded" class="columns is-centered">
      <div class="column">
        <section class="has-text-centered">
          <div class="columns">
            <div class="column desktopCanvasOffset is-three-quarters">
              <div class="mt-5">
                <img id="originalDisplayImg" v-show="originalVisible" :src="originalDisplayImg"/>
                <img id="originalImg" v-show="false" :src="originalImg"/>
              </div>
              <div id="imgBucket" class="mt-6">
                <!-- reuse this bad boi for holding on to changes in updateFilterVal -->
                <img id="shapeImg" class="hidden" :src="shapeImg"/>
                <img id="filterImg" class="hidden" :src="filterImg"/>
                <VueCropper ref="cropper" :autoCropArea="cropping.defaultSize" :autoCrop="cropping.val" v-show="cropperVisible" :minContainerWidth="containerWidth" :minContainerHeight="containerHeight" alt="Cropping Img" @cropend="doneChangingShape"></VueCropper>
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
              <div class="is centered mt-5" v-show="uploaded">
                <button id="downloadButton" @click="undoAll()" class="button is-black">Undo All</button>
              </div>
              <div class="desktopControls">
                <router-view
                  @updateLightVal="updateLightVal"
                  @updateColorVal="updateColorVal"
                  @updateShapeVal="updateShapeVal"
                  @doneChangingFilter="doneChangingFilter"
                  @doneChangingShape="doneChangingShape"
                  @changeStateButton="changeStateButton"
                  :red="red.val"
                  :green="green.val"
                  :blue="blue.val"
                  :brightness="brightness.val"
                  :contrast="contrast.val"
                  :vibrance="vibrance.val"
                  :hue="hue.val"
                  :saturation="saturation.val"
                  :smooth="smooth.val"
                  :rotation="rotation.val"
                  :cropping="cropping.val"
                  :size="size.val"
                  :straightening="straightening.val"
                  :sepia="sepia.val"
                  :noise="noise.val"
                  :ink="ink.val"
                  :defaultStraightenAmount="defaultStraightenAmount.val"
                  :defaultBrightness="defaultBrightness.val"
                  :defaultContrast="defaultContrast.val"
                  :defaultVibrance="defaultVibrance.val"
                  :defaultHue="defaultHue.val"
                  :defaultSaturation="defaultSaturation.val"
                  :defaultRed="defaultRed.val"
                  :defaultBlue="defaultBlue.val"
                  :defaultGreen="defaultGreen.val"
                  :defaultSmooth="defaultSmooth.val"
                  :defaultRotation="defaultRotation.val"
                  :defaultSize="defaultSize.val"
                  :defaultSepia="defaultSepia.val"
                  :defaultNoise="defaultNoise.val"
                  :defaultInk="defaultInk.val"
                ></router-view>
              </div>
            </div>
          </div>
          <p class="mt-5" v-show="uploaded"><strong class="has-text-white">Please bookmark us!</strong></p>
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
    <div v-else class="columns placeholder desktopCanvasOffset">
        <div class="column is-three-quarters">
          <section class="hero is-primary is-large header-image">
              <!-- Hero content: will be in the middle -->
              <div class="hero-body">
                  <div class="container has-text-centered">
                      <h1 class="title has-text-black">
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
          <div class="desktopControls has-text-centered">
            <router-view
              @updateLightVal="updateLightVal"
              @updateColorVal="updateColorVal"
              @updateShapeVal="updateShapeVal"
              @doneChangingFilter="doneChangingFilter"
              @doneChangingShape="doneChangingShape"
              @changeStateButton="changeStateButton"
              :red="red.val"
              :green="green.val"
              :blue="blue.val"
              :brightness="brightness.val"
              :contrast="contrast.val"
              :vibrance="vibrance.val"
              :hue="hue.val"
              :saturation="saturation.val"
              :smooth="smooth.val"
              :rotation="rotation.val"
              :cropping="cropping.val"
              :size="size.val"
              :straightening="straightening.val"
              :sepia="sepia.val"
              :noise="noise.val"
              :ink="ink.val"
              :defaultStraightenAmount="defaultStraightenAmount.val"
              :defaultBrightness="defaultBrightness.val"
              :defaultContrast="defaultContrast.val"
              :defaultVibrance="defaultVibrance.val"
              :defaultHue="defaultHue.val"
              :defaultSaturation="defaultSaturation.val"
              :defaultRed="defaultRed.val"
              :defaultBlue="defaultBlue.val"
              :defaultGreen="defaultGreen.val"
              :defaultSmooth="defaultSmooth.val"
              :defaultRotation="defaultRotation.val"
              :defaultSize="defaultSize.val"
              :defaultSepia="defaultSepia.val"
              :defaultNoise="defaultNoise.val"
              :defaultInk="defaultInk.val"
            ></router-view>
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
const IMAGE_LOAD_TIME = 50;

export default {
  name: 'ImageForm',
  emits: ['updateColorVal', 'updateShapeVal'],
  watch:{
    $route (to, from){
      if(this.uploaded){
        const path = to.path;
        switch(path){
          case "/transformations/color":
            this.initWebGLCanvas()
            break
          case "/transformations/light":
            this.initWebGLCanvas()
            break
          case "/transformations/shape":
            this.reInitCropperjsCanvas();
            break
        }
      }
    }
  },
  created(){
    if(screen.width > 1100){
      //desktop
      this.desktopMode = true
      this.containerWidth = this.getPercentOfScreenVal(DESKTOP_CANVAS_PERCENT)
      console.log(this.containerWidth)
    } else {
      this.desktopMode = false
      this.containerWidth = this.getPercentOfScreenVal(MOBILE_CANVAS_PERCENT)
    }
  },
  components: {
    VueCropper
  },
  props: {
    msg: String
  },
  data() {
    return {
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
      //mobile first!
      desktopMode: false,
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
  methods: {
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
          this.reInitCropperjsCanvas()
          break
      }
    },
    resetFilterShapeVals(){
      console.log('called reset filter shape vals')
      //light/effects stuff
      this.brightness.val = this.defaultBrightness.val;
      this.contrast.val = this.defaultContrast.val;
      this.smooth.val = this.defaultSmooth.val;
      this.sepia.val = this.defaultSepia.val;
      this.noise.val = this.defaultNoise.val;
      this.ink.val = this.defaultInk.val;
      //color
      this.vibrance.val = this.defaultVibrance.val;
      this.hue.val = this.defaultHue.val;
      this.saturation.val = this.defaultSaturation.val;
      this.red.val = this.defaultRed.val;
      this.blue.val = this.defaultBlue.val;
      this.green.val = this.defaultGreen.val;
      //shape
      this.size.val = this.defaultSize.val;
      this.sizeX.val = this.defaultSizeX.val;
      this.sizeY.val = this.defaultSizeY.val;
      this.rotation.val = this.defaultRotation.val;
      this.cropping.val = false;
      this.cropped.val = false;
      this.straightening.val = false;
      this.straightened.val = false;
      this.straightenAmount.val = this.defaultStraightenAmount.val;
    },
    submit(e) {
      //delete old canvas
      //for re-uploading
      //first check if valid file format/save file format
      const file = e.target.files[0];
      this.imgFileName = file.name;
      const fileExt = file.name.split('.').pop();
      if (fileExt === "png" || fileExt === "PNG") {
        this.imgFileExt = "image/png"
      } else if (fileExt === "jpg" || fileExt === "jpeg" || fileExt === "JPG" || fileExt === "JPEG") {
        this.imgFileExt = "image/jpeg"
      } else {
        alert('Sorry, only jpg/jpeg/pngs accepted currently.')
        return
      }
      this.resetFilterShapeVals()
      this.removeCanvasIfExists()

      //here we need to ask if the image is too big
      const objURL = URL.createObjectURL(file)

      //filter img does not get resized, it is not displayed, except on cropper js, which doesnt care about size.
      this.filterImg = objURL
      this.originalImg = objURL
      const img = new Image();
      const ref = this
      this.uploaded = true
      img.onload = function () {
        //ref.cropperVisible = true;
        if (ref.imgTooBig(this, ref)) {
          ref.fitImgToCanvas(objURL, 'cropper', this, ref, true)
        } else {
          ref.shapeImg = objURL
          ref.originalDisplayImg = objURL
        }
        const path = ref.$route.name;
        //waiting for images to load
        setTimeout(function() {
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
        ref.originalAspectRatio = this.width / this.height;
      };
      //set download
      img.src = objURL;
      this.img = objURL;
      URL.revokeObjectURL(objURL);
    },
    updateColorVal(newVal){
      this.updateFilterVal(newVal);
    },
    updateLightVal(newVal){
      this.updateFilterVal(newVal);
    },
    getPercentOfScreenVal(percent){
      const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return width * percent
    },
    getFilterCanvas(img){
      const canvas = glfx.canvas();
      const gl = canvas.getContext('webgl');
      gl.getExtension('WEBGL_color_buffer_float');

      const texture = canvas.texture(img);
      canvas.draw(texture).update()

      if (this.brightness.val !== this.defaultBrightness.val || this.contrast.val !== this.defaultContrast.val) {
        canvas.draw(texture).brightnessContrast((this.brightness.val * .01), (this.contrast.val * .01)).update();
      }

      if (this.vibrance.val !== this.defaultVibrance.val) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).vibrance((this.vibrance.val * .01)).update();
      }

      if (this.hue.val !== this.defaultHue.val || this.saturation.val !== this.defaultSaturation.val) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).hueSaturation((this.hue.val * .01), (this.saturation.val * .01)).update();
      }

      if (this.red.val !== this.defaultRed.val ||
          this.green.val !== this.defaultGreen.val ||
          this.blue.val !== this.defaultBlue.val) {
        //colors!
        texture.loadContentsOf(canvas);
        const redVal = this.red.val * .01;
        const blueVal = this.blue.val * .01;
        const greenVal = this.green.val * .01;
        canvas.draw(texture).curves([[0,0], [.25, .25 - redVal], [.75, .75 + redVal], [1,1]], [[0,0], [.25, .25 - greenVal], [.75, .75 + greenVal], [1,1]], [[0,0], [.25, .25 - blueVal], [.75, .75 + blueVal], [1,1]]).update();
      }

      if (this.smooth.val !== this.defaultSmooth.val) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).denoise(this.smooth.val).update();
      }

      if (this.sepia.val !== this.defaultSepia.val) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).sepia(this.sepia.val * .01).update();
      }

      if (this.noise.val !== this.defaultNoise.val) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).noise(this.noise.val * .01).update();
      }

      if (this.ink.val !== this.defaultInk.val) {
        texture.loadContentsOf(canvas);
        canvas.draw(texture).ink(this.ink.val * .01).update();
      }
      texture.destroy();
      return canvas
    },
    applyShapeChanges(cropperName){
      this.$refs[cropperName].rotateTo(this.rotation.val);
      this.$refs[cropperName].scaleX(this.sizeX.val * .01)
      this.$refs[cropperName].scaleY(this.sizeY.val * .01)
      //this.$refs[cropperName].scale(this.size.val * .01, this.size.val * .01)
      this.straighten(cropperName)
    },
    updateFilterVal(newVal){
      //dont apply changes if no photo
      if (this.uploaded) {
        this[newVal['valType']].val = newVal['newVal']
        var shapeImg = document.getElementById('shapeImg')
        const imgBucket = document.getElementById('imgBucket');
        const oldCanvas = document.getElementsByTagName("canvas")[0];
        const displayCanvas = this.getFilterCanvas(shapeImg);

        imgBucket.removeChild(oldCanvas);
        imgBucket.insertBefore(displayCanvas, filterImg)
      }
    },
    updateShapeVal(newVal){
      //get cropper
      if (this.uploaded) {
        this[newVal['valType']].val = newVal['newVal']
        if (newVal['valType'] === 'size'){
          this.sizeX.val = newVal['newVal']
          this.sizeY.val = newVal['newVal']
        }
        this.applyShapeChanges('cropper')
      }
    },
    initWebGLCanvas() {
      console.log('called init webgl canvas')
      //remove cropper
      const ref = this;
      this.cropperVisible = false;
      this.removeCanvasIfExists()

      if (ref.imgTooBig(shapeImg, ref)) {
        console.log('thoguht the image had to be shrunk')
        ref.fitImgToCanvas(this.shapeImg, 'storageCropper', shapeImg, ref, false)
      }

      setTimeout(function() {
        const shapeImg = document.getElementById('shapeImg')
        ref.$refs.storageCropper.replace(ref.originalDisplayImg);
        const canvas = ref.getFilterCanvas(shapeImg)
        shapeImg.parentNode.insertBefore(canvas, shapeImg);
      }, IMAGE_LOAD_TIME);
    },
    initCropperjsCanvas() {
      this.cropperVisible = true
      this.$refs.cropper.replace(this.originalImg);
      this.$refs.storageCropper.replace(this.originalDisplayImg);
      this.$refs.outputCropper.replace(this.originalImg);
    },
    reInitCropperjsCanvas() {
      this.cropperVisible = true;
      this.removeCanvasIfExists()
      this.$refs.cropper.replace(this.filterImg);
      const changeObj = {
        "newVal": this.rotation.val,
        "valType": "rotation"
      }
      const ref = this
      setTimeout(function() {
        ref.updateShapeVal(changeObj)
      }, IMAGE_LOAD_TIME);
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
      var originalDisplayImg = document.getElementById('originalDisplayImg')
      this.applyShapeChanges('storageCropper')
      this.shapeImg = this.$refs.storageCropper.getCroppedCanvas().toDataURL(this.imgFileExt, 1)
    },
    doneChangingFilter(){
      var originalImg = document.getElementById('originalImg')
      this.filterImg = this.getFilterCanvas(originalImg).toDataURL(this.imgFileExt, 1)
    },
    changeStateButton(newVal){
      console.log(newVal)
      if (newVal['valType'] === "Straightening") {
        this.straightening.val = !this.straightening.val
      }

      if (newVal['valType'] === "Cropping") {
        //flip it!
        this.cropping.val = !this.cropping.val
      }

      if (newVal['valType'] === "Aspect Ratio") {
        this.$refs.cropper.setAspectRatio(this.originalAspectRatio)
      }

      if (newVal['valType'] === "Flip Along X"){
        this.sizeX.val = -1 * this.sizeX.val
        this.applyShapeChanges('cropper')
      } else if (newVal['valType'] === "Flip Along Y") {
        this.sizeY.val = -1 * this.sizeY.val
        this.applyShapeChanges('cropper')
      }
      //ask if we are cropping
      this.changeCropState('cropper', newVal)
    },
    changeCropState(cropperName, newVal){
      //if we have yet to crop anything
      if (this.cropped.val === false) {
        if (this.straightening.val || this.cropping.val) {
          this.$refs[cropperName].initCrop()
        } else {
          this.$refs[cropperName].clear()
        }
      }

      if (this.cropping.val) {
        if (newVal['valType'] === 'Save') {
          this.cropping.val = false
          this.cropped.val = true
          //this.prepOutput()
        } else if (newVal['valType'] === 'Cancel') {
          this.$refs[cropperName].clear()
          this.cropping.val = false
          this.cropped.val = false
        }
      }

      if (this.straightening.val) {
        if (newVal['valType'] === 'Save') {
          this.straightened.val = true
          //this.prepOutput()
          this.straightening.val = false
        } else if (newVal['valType'] === 'Cancel') {
          this.$refs[cropperName].clear()
          this.straightenAmount.val = 0
          this.straighten('cropper')
          //this.prepOutput()
          this.straightening.val = false
          this.straightened.val = false
        }
      }

      if (this.straightening.val && newVal['valType'] === "Straightening") {
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
    fitImgToCanvas(newImgURL, cropperRef, image, vueRef, submitCall){
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
        //correctly sized img
        const correctlySizedImg = vueRef.$refs[cropperRef].getCroppedCanvas().toDataURL(vueRef.imgFileExt, 1)
        vueRef.shapeImg = correctlySizedImg
        if (submitCall) {
          vueRef.originalDisplayImg = correctlySizedImg
        }
      }, IMAGE_LOAD_TIME)
    },
    straighten(cropperName){
      //rotate and crop to fit as we rotate
      if (this.straightening.val || this.straightened.val) {
        this.$refs[cropperName].rotateTo(this.straightenAmount.val)
        this.$refs[cropperName].scale(1 + (.021 * Math.abs(this.straightenAmount.val)))
      }
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
        if (ref.cropped.val || ref.straightened.val){
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
  .placeholder{
    height: 77vh;
  }

  .mobile-placeholder{
    height: 150vh;
  }

  .desktopControls{
    position: relative;
    top: 75px;
  }

  .desktopCanvasOffset{
    margin-left: 1%;
  }

  .header-image {
    background-image: url("http://orig14.deviantart.net/7584/f/2015/181/2/7/flat_mountains_landscape_by_ggiuliafilippini-d8zdbco.jpg");
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
