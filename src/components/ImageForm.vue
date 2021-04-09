<template>
  <div class="columns is-centered">
    <div class="column is-three-quarters">
      <section class="container has-text-centered">
        <div class="columns mt-4">
          <div class="column">
            <div class="file is-primary is-centered">
              <label class="file-label">
                <input class="file-input" type="file" name="photo" @change="submit">
                <span class="file-cta">
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div class="column" v-show="uploaded">
            <button class="button is-info" @click="originalVisible = !originalVisible">Show Original</button>
          </div>
          <div class="column" v-show="uploaded">
            <a :download="imgFileName" :href="img" id="downloadLink"><button class="button is-success" @click="download">Download Copy</button></a>
          </div>
        </div>
        <div v-show="uploaded">
          <router-view @updateLightVal="updateLightVal" @updateColorVal="updateColorVal" @updateShapeVal="updateShapeVal" @doneChangingFilter="doneChangingFilter" @doneChangingShape="doneChangingShape"></router-view>
        </div>
        <div id="imgBucket" class="mt-5">
          <!-- reuse this bad boi for holding on to changes in updateFilterVal -->
          <img id="shapeImg" class="hidden" :src="shapeImg"/>
          <img id="filterImg" class="hidden" :src="filterImg"/>
          <img id="originalImg" v-show="originalVisible" :src="originalImg"/>
          <VueCropper ref="cropper" :src="filterImg" alt="Cropping Img" v-show="cropperVisible"></VueCropper>
          <VueCropper ref="storageCropper" alt="Cropping storage Img" v-show="false"></VueCropper>
        </div>
        <p class="mt-5" v-show="uploaded"><strong>Don't forget to bookmark us! plz</strong></p>
      </section>
    </div>
  </div>
</template>

<script>
import glfx from 'glfx';
//import jimp from 'jimp';
import VueCropper from 'vue-cropperjs';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
//max height 1000, max width is 80% of screen, after that experience falloff bitch
const IMAGE_HEIGHT = 500;

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
      originalVisible: false,
      img: null,
      uploaded: false,
      imgFileName: null,
      cacheImg: null,
      filterStorageCanvas: null,
      cropperVisible: false,
      shapeImg: null,
      filterImg: null,
      originalImg: null,
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
      rotation: {
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
      this.resetFilterShapeVals()
      this.removeCanvasIfExists()
      this.uploaded = true
      // want to make two copies of the file
      const file = e.target.files[0];
      const objURL = URL.createObjectURL(file)
      this.shapeImg = objURL
      this.filterImg = objURL
      this.originalImg = objURL
      //if path changes to crop/rotate/sizing etc, convert canvas to 2d context
      const path = this.$route.name;
      const ref = this
      //waiting for images to load
      setTimeout(function() {
        console.log(path)
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
      }, 100);
      this.imgFileName = file.name
    },
    updateColorVal(newVal){
      this.updateFilterVal(newVal);
    },
    updateLightVal(newVal){
      this.updateFilterVal(newVal);
    },
    get70PercentOfScreenVal(){
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
      canvas.draw(texture).curves([[0,0], [.5, this.red.val * .01], [1,1]], [[0,0], [.5, this.green.val * .01], [1,1]], [[0,0], [.5, this.blue.val * .01], [1,1]]).update();
      texture.destroy();
      return canvas
    },
    updateFilterVal(newVal){
      this[newVal['valType']].val = newVal['newVal']
      var shapeImg = document.getElementById('shapeImg')
      const imgBucket = document.getElementById('imgBucket');
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      const displayCanvas = this.getFilterCanvas(shapeImg);

      imgBucket.removeChild(oldCanvas);
      imgBucket.insertBefore(displayCanvas, originalImg)
    },
    updateShapeVal(newVal){
      //get cropper
      this[newVal['valType']].val = newVal['newVal']
      this.$refs.cropper.rotateTo(this.rotation.val);

      //this.shapeImg = this.$refs.cropper.getCroppedCanvas().toDataURL("image/png")
    },
    initWebGLCanvas() {
      //remove cropper
      // console.log('called init WEBGL Canvas')
      this.cropperVisible = false;
      this.removeCanvasIfExists()
      const shapeImg = document.getElementById('shapeImg')
      const canvas = this.getFilterCanvas(shapeImg)
      //order of width/height, (x, y) pos opposite!!!
      shapeImg.parentNode.insertBefore(canvas, shapeImg);
      const changeObj = {
        "newVal": this.rotation.val,
        "valType": "rotation"
      }
      //this.updateFilterVal(changeObj)
    },
    initCropperjsCanvas() {
      this.cropperVisible = true;
      this.removeCanvasIfExists()
      console.log(this.filterImg)
      this.$refs.cropper.replace(this.filterImg);
      this.$refs.storageCropper.replace(this.originalImg);
    },
    reInitCropperjsCanvas() {
      this.cropperVisible = true;
      this.removeCanvasIfExists()
      this.$refs.cropper.replace(this.filterImg);
      const changeObj = {
        "newVal": this.rotation.val,
        "valType": "rotation"
      }
      this.$refs.cropper.rotateTo(0);
      const ref = this
      setTimeout(function() {
        ref.updateShapeVal(changeObj)
      }, 100);
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
      var originalImg = document.getElementById('originalImg')
      this.$refs.storageCropper.rotateTo(this.rotation.val);
      this.shapeImg = this.$refs.storageCropper.getCroppedCanvas().toDataURL()
    },
    doneChangingFilter(){
      var originalImg = document.getElementById('originalImg')
      this.filterImg = this.getFilterCanvas(originalImg).toDataURL()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
