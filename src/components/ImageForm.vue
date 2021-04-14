<template>
  <div class="columns is-centered">
    <div class="column is-three-quarters">
      <section class="container has-text-centered">
        <div class="columns mt-4">
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
            <a :download="imgFileName" :href="img" id="downloadLink"><button class="button is-black">Download Copy</button></a>
          </div>
        </div>
        <div v-show="uploaded">
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
            :highlights="highlights.val"
            :shadows="shadows.val"
            :smooth="smooth.val"
            :rotation="rotation.val"
            :cropping="cropping.val"
            :scale="scale.val"
            :straightening="straightening.val"
          ></router-view>
        </div>
        <div class="mt-5">
          <img id="originalDisplayImg" v-show="originalVisible" :src="originalDisplayImg"/>
          <img id="originalImg" v-show="false" :src="originalImg"/>
        </div>
        <div id="imgBucket" class="mt-5">
          <!-- reuse this bad boi for holding on to changes in updateFilterVal -->
          <img id="shapeImg" class="hidden" :src="shapeImg"/>
          <img id="filterImg" class="hidden" :src="filterImg"/>
          <VueCropper ref="cropper" :src="filterImg" :autoCropArea="cropping.defaultSize" :autoCrop="cropping.val" :minContainerWidth="get75PercentOfScreenVal()" :minContainerHeight="imgHeight" alt="Cropping Img" v-show="cropperVisible"></VueCropper>
          <VueCropper ref="storageCropper" :autoCropArea="2" :autoCrop="false" alt="Cropping storage Img" v-show="false"></VueCropper>
          <VueCropper ref="outputCropper" :autoCropArea="2" :autoCrop="false" alt="Cropping storage Img" v-show="false"></VueCropper>
        </div>
        <p class="mt-5" v-show="uploaded"><strong>Please bookmark us!</strong></p>
      </section>
    </div>
  </div>
</template>

<script>
import glfx from 'glfx';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

//max height 1000, max width is 80% of screen, after that experience falloff bitch
const IMAGE_HEIGHT = 500;
const IMAGE_LOAD_TIME = 50;

export default {
  name: 'ImageForm',
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
      imgHeight: IMAGE_HEIGHT,
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
      shadows: {
        val: 0
      },
      highlights: {
        val: 0
      },
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
      croppingAspectRatio: {
        val: false
      },
      scale: {
        val: 100
      },
      straightening: {
        val: false
      },
      straightenAmount: {
        val: 0
      }
    }
  },
  methods: {
    resetFilterShapeVals(){
      this.brightness.val = 0;
      this.contrast.val = 0;
      this.vibrance.val = 0;
      this.hue.val = 0;
      this.saturation.val = 0;
      this.red.val = 0;
      this.blue.val = 0;
      this.green.val = 0;
      this.rotation.val = 0;
    },
    async submit(e) {
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
      this.uploaded = true

      //here we need to ask if the image is too big
      const objURL = URL.createObjectURL(file)
      const img = new Image();
      const ref = this
      const canvasWidth = this.get75PercentOfScreenVal()
      img.onload = function () {
        if (this.width > canvasWidth) {
          //image too big to just be rendered as is
          ref.$refs.cropper.replace(objURL);
          //need the ratio of the
          const newSizeRatio = canvasWidth / this.width;

          //need to make a copy
          setTimeout(function() {
            ref.$refs.cropper.scale(newSizeRatio, newSizeRatio)
            const correctSizeImg = ref.$refs.cropper.getCroppedCanvas().toDataURL(ref.imgFileExt, 1)
            ref.$refs.cropper.replace(correctSizeImg)
            ref.shapeImg = correctSizeImg
            ref.filterImg = correctSizeImg
            ref.originalDisplayImg = correctSizeImg
            //if path changes to crop/rotate/sizing etc, convert canvas to 2d context
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
          }, IMAGE_LOAD_TIME);
        } else {
          ref.shapeImg = objURL
          ref.filterImg = objURL
          ref.originalDisplayImg = objURL
          //if path changes to crop/rotate/sizing etc, convert canvas to 2d context
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
        }
        this.originalAspectRatio = this.width / this.height;
        URL.revokeObjectURL(objURL);
      };
      this.originalImg = objURL
      //set download
      img.src = objURL;
      this.img = objURL;
      this.download = this.imgFileName;
    },
    updateColorVal(newVal){
      this.updateFilterVal(newVal);
    },
    updateLightVal(newVal){
      this.updateFilterVal(newVal);
    },
    get75PercentOfScreenVal(){
      const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return width * .75
    },
    getFilterCanvas(img){
      const canvas = glfx.canvas();
      const gl = canvas.getContext('webgl');
      gl.getExtension('WEBGL_color_buffer_float');

      const texture = canvas.texture(img);

      canvas.draw(texture).brightnessContrast((this.brightness.val * .01), (this.contrast.val * .01)).update();

      texture.loadContentsOf(canvas);
      canvas.draw(texture).vibrance((this.vibrance.val * .01)).update();

      texture.loadContentsOf(canvas);
      canvas.draw(texture).hueSaturation((this.hue.val * .01), (this.saturation.val * .01)).update();

      //colors!
      texture.loadContentsOf(canvas);
      const redVal = this.red.val * .01;
      const blueVal = this.blue.val * .01;
      const greenVal = this.green.val * .01;
      canvas.draw(texture).curves([[0,0], [.25, .25 - redVal], [.75, .75 + redVal], [1,1]], [[0,0], [.25, .25 - greenVal], [.75, .75 + greenVal], [1,1]], [[0,0], [.25, .25 - blueVal], [.75, .75 + blueVal], [1,1]]).update();

      //smooth!
      //texture.loadContentsOf(canvas);
      //canvas.draw(texture).denoise(this.smooth.val).update();

      texture.destroy();
      return canvas
    },
    applyShapeChanges(cropperName){
      this.$refs[cropperName].rotateTo(this.rotation.val);
      this.$refs[cropperName].scale(this.scale.val * .01, this.scale.val * .01)
      this.straighten(cropperName)
      //this.changeCropState(cropperName)
    },
    updateFilterVal(newVal){
      this[newVal['valType']].val = newVal['newVal']
      var shapeImg = document.getElementById('shapeImg')
      const imgBucket = document.getElementById('imgBucket');
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      const displayCanvas = this.getFilterCanvas(shapeImg);

      imgBucket.removeChild(oldCanvas);
      imgBucket.insertBefore(displayCanvas, filterImg)
    },
    updateShapeVal(newVal){
      //get cropper
      this[newVal['valType']].val = newVal['newVal']
      this.applyShapeChanges('cropper')
    },
    initWebGLCanvas() {
      //remove cropper
      const ref = this;
      this.cropperVisible = false;
      this.removeCanvasIfExists()
      const shapeImg = document.getElementById('shapeImg')

      const canvasWidth = this.get75PercentOfScreenVal()
      if (shapeImg.width > canvasWidth) {
        //resize using storageCropper
        const cropperToGLFXRatio = canvasWidth / shapeImg.width;
        this.$refs.storageCropper.replace(this.shapeImg);

        setTimeout(function() {
          ref.$refs.storageCropper.scale(cropperToGLFXRatio, cropperToGLFXRatio)
          const correctSizeImg = ref.$refs.storageCropper.getCroppedCanvas().toDataURL(ref.imgFileExt, 1)
          ref.shapeImg = correctSizeImg
        }, IMAGE_LOAD_TIME);
      }

      setTimeout(function() {
        const shapeImg = document.getElementById('shapeImg')
        ref.$refs.storageCropper.replace(ref.originalDisplayImg);
        const canvas = ref.getFilterCanvas(shapeImg)
        shapeImg.parentNode.insertBefore(canvas, shapeImg);
      }, IMAGE_LOAD_TIME);
    },
    initCropperjsCanvas() {
      this.cropperVisible = true;
      this.removeCanvasIfExists()
      this.$refs.cropper.replace(this.filterImg);
      this.$refs.storageCropper.replace(this.originalDisplayImg);
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
      this.prepOutput()
    },
    doneChangingFilter(){
      var originalDisplayImg = document.getElementById('originalDisplayImg')
      this.filterImg = this.getFilterCanvas(originalDisplayImg).toDataURL(this.imgFileExt, 1)
      this.$refs.cropper.replace(this.filterImg);
      this.prepOutput()
    },
    changeStateButton(newVal){
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
      //ask if we are cropping
      this.changeCropState('cropper')
    },
    changeCropState(cropperName){
      if (this.cropping.val || this.straightening.val){
        this.$refs[cropperName].initCrop()
        if (this.straightening.val) {
          //need to set crop box to max
          const cropperData = this.$refs[cropperName].getCanvasData()
          this.$refs[cropperName].setCropBoxData({
            "left": cropperData['left'],
            "top": 0,
            "width": cropperData['width'],
            "height": cropperData['height']
          })
        }
      } else {
        this.$refs[cropperName].clear()
      }
    },
    straighten(cropperName){
      //rotate and crop to fit as we rotate
      if (this.straightening.val) {
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
      this.$refs.outputCropper.replace(originalImgWFilters)

      const ref = this;
      setTimeout(function() {
        //apply rotation, scale, cropping
        ref.applyShapeChanges('outputCropper')
        if (ref.cropping.val || ref.straightening.val){
          //need cropper info
          const cropperData = ref.$refs.cropper.getCropBoxData()
          ref.$refs.outputCropper.initCrop()
          ref.img = ref.$refs.outputCropper.setCropBoxData({
            "left": cropperData['left'],
            "top": cropperData['top'],
            "width": cropperData['width'],
            "height": cropperData['height']
          })
        }
        setTimeout(function() {
          ref.img = ref.$refs.outputCropper.getCroppedCanvas().toDataURL(ref.imgFileExt, 1)
        }, IMAGE_LOAD_TIME);
      }, IMAGE_LOAD_TIME);
      //we should now have all alterations accounted for at this point.
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
