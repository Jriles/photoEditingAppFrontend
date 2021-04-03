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
          <router-view @updateLightVal="updateLightVal" @updateColorVal="updateColorVal" @updateShapeVal="updateShapeVal" @sliderDone="sliderDone" @shapeCropSliderDone="shapeCropSliderDone"></router-view>
        </div>
        <div id="img-bucket" class="mt-5">
          <!-- reuse this bad boi for holding on to changes in updateVal -->
          <img id="transition-img" :src="cacheImg" class="hidden"/>
          <div>
            <img id="original-img" v-show="originalVisible" :src="img"/>
          </div>
        </div>
        <p class="mt-5" v-show="uploaded"><strong>Don't forget to bookmark us! plz</strong></p>
      </section>
    </div>
  </div>
</template>

<script>
import glfx from 'glfx';
//import jimp from 'jimp';
import Cropper from 'cropperjs';

//max height 1000, max width is 80% of screen, after that experience falloff bitch
const IMAGE_HEIGHT = 500;

export default {
  name: 'ImageForm',
  watch:{
    $route (to, from){
      if(this.uploaded){
        document.getElementById('transition-img').className = ''
        //if path changes to crop/rotate/sizing etc, convert canvas to 2d context
        const path = to.path;
        console.log(path)

        switch(path){
          case "/transformations/color":
            console.log('thinks switching to color')
            this.swap2dForWebGL()
          case "/transformations/light":
            this.swap2dForWebGL()
          case "/transformations/crop":
            console.log('asked for crop')
          case "/transformations/shape":
            this.swapWebGLFor2d();
        }
        document.getElementById('transition-img').className = 'hidden'
      }
    }
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
    async submit(e) {
      //delete old canvas
      const canvi = document.getElementsByTagName("canvas");
      if (canvi.length > 0){
        const imgBucket = document.getElementById('img-bucket');
        const oldCanvas = canvi[0];
        imgBucket.removeChild(oldCanvas)
      }
      this.uploaded = true
      // want to make two copies of the file
      const file = e.target.files[0];
      var image = document.getElementById('transition-img');
      this.cacheImg = URL.createObjectURL(file)
      this.img = URL.createObjectURL(file)
      //if path changes to crop/rotate/sizing etc, convert canvas to 2d context
      const path = this.$route.name;
      const ref = this
      //waiting for images to load
      setTimeout(function() {
        console.log(path)
        switch (path) {
          case "color":
            ref.initWebGLCanvas(image)
          break
          case "light":
            ref.initWebGLCanvas(image)
          break
          case "crop":
            ref.init2dCanvas(image)
          break
          case "shape":
            ref.init2dCanvas(image)
          break
        }
      }, 100);
      this.imgFileName = file.name
    },
    updateColorVal(newVal){
      this.updateVal(newVal);
    },
    updateLightVal(newVal){
      this.updateVal(newVal);
    },
    get70PercentOfScreenVal(){
      const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return width * .75
    },
    renderImageOnCanvas2D(context, canvas){
      var transitionImg = document.getElementById('transition-img');
      const width = transitionImg.width;
      const height = transitionImg.height;

      canvas.width = this.get70PercentOfScreenVal()
      canvas.height = IMAGE_HEIGHT
      context.drawImage(transitionImg, (canvas.width/2)-(width/2), (canvas.height/2)-(height/2), width, height);
    },
    updateShapeVal(newVal){
      console.log('called update crop and rotate val')
      this[newVal['valType']].val = newVal['newVal']

      var originalImg = document.getElementById('original-img')
      const imgBucket = document.getElementById('img-bucket');
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      const ctx = oldCanvas.getContext('2d');
      console.log(this.rotation.val)
      //ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
      oldCanvas.width = this.get70PercentOfScreenVal()
      oldCanvas.height = IMAGE_HEIGHT
      ctx.translate(oldCanvas.width/2, oldCanvas.height/2);
      ctx.rotate(this.rotation.val * Math.PI / 180)
      var transitionImg = document.getElementById('transition-img');
      const width = transitionImg.width;
      const height = transitionImg.height;
      ctx.drawImage(transitionImg, -(width/2), -(height/2), width, height);
      this.updateDownloadLink()
    },
    updateVal(newVal){
      this[newVal['valType']].val = newVal['newVal']
      var transitionImg = document.getElementById('transition-img');
      var originalImg = document.getElementById('original-img')
      transitionImg.className = 'hidden'
      const imgBucket = document.getElementById('img-bucket');
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      const canvas = glfx.canvas();
      const gl = canvas.getContext('webgl');
      gl.getExtension('WEBGL_color_buffer_float');

      const texture = canvas.texture(transitionImg);

      canvas.draw(texture).brightnessContrast((this.brightness.val * .01), (this.contrast.val * .01)).update();

      texture.loadContentsOf(canvas);
      canvas.draw(texture).vibrance((this.vibrance.val * .01)).update();

      texture.loadContentsOf(canvas);
      canvas.draw(texture).hueSaturation((this.hue.val * .01), (this.saturation.val * .01)).update();

      //colors!
      texture.loadContentsOf(canvas);
      canvas.draw(texture).curves([[0,0], [.5, this.red.val * .01], [1,1]], [[0,0], [.5, this.green.val * .01], [1,1]], [[0,0], [.5, this.blue.val * .01], [1,1]]).update();

      //texture.destroy();
      imgBucket.removeChild(oldCanvas);
      imgBucket.insertBefore(canvas, transitionImg)
      texture.destroy();

      this.updateDownloadLink()
    },
    swapWebGLFor2d(){
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      const imgBucket = document.getElementById('img-bucket');
      var canvas = document.createElement("canvas");
      var transitionImg = document.getElementById('transition-img');
      const ctx = canvas.getContext('2d');
      this.renderImageOnCanvas2D(ctx, canvas);
      imgBucket.insertBefore(canvas, transitionImg)
      imgBucket.removeChild(oldCanvas);
    },
    swap2dForWebGL(){
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      var transitionImg = document.getElementById('transition-img');
      const imgBucket = document.getElementById('img-bucket');
      var canvas = glfx.canvas();
      const gl = canvas.getContext('webgl');
      const { width, height } = oldCanvas.getBoundingClientRect();
      canvas.width = width
      canvas.height = height
      const texture = canvas.texture(transitionImg);
      canvas.draw(texture).update();
      imgBucket.insertBefore(canvas, transitionImg)
      imgBucket.removeChild(oldCanvas);
    },
    updateDownloadLink(){
      const canvas = document.getElementsByTagName("canvas")[0];
      var downloadLink = document.getElementById('downloadLink');
      downloadLink.href = canvas.toDataURL();
      downloadLink.download = 'yourNewImage.png'
    },
    sliderDone(newVal){
      //this only happens in an event. (on key up, for everyone )
      document.getElementById('transition-img').src = document.getElementById('downloadLink').href;
    },
    async initWebGLCanvas(image) {
      console.log('called init WEBGL Canvas')
      const canvas = glfx.canvas();
      const gl = canvas.getContext('webgl', {preserveDrawingBuffer: true});
      const texture = canvas.texture(image);
      const width = image.width;
      const height = image.height;
      //order of width/height, (x, y) pos opposite!!!
      canvas.draw(texture).update()
      image.parentNode.insertBefore(canvas, image);
      const oldCanvas = document.getElementsByTagName("canvas")[0];
    },
    async init2dCanvas(image) {
      console.log('called init 2d canvas')
      var canvas = document.createElement("canvas");
      canvas.width = this.get70PercentOfScreenVal();
      canvas.height = IMAGE_HEIGHT;
      const gl = canvas.getContext('2d', {preserveDrawingBuffer: true});
      const width = image.width;
      const height = image.height;
      console.log(width)
      console.log(height)
      gl.drawImage(image, 0, 0, width, height);
      image.parentNode.insertBefore(canvas, image);
      const oldCanvas = document.getElementsByTagName("canvas")[0];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
