<template>
  <div class="columns is-centered">
    <div class="column is-half">
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
          <router-view @updateLightVal="updateLightVal" @updateColorVal="updateColorVal"></router-view>
        </div>
        <div id="img-bucket">
          <!-- reuse this bad boi for holding on to changes in updateVal -->
          <img id="transition-img" :src="cacheImg"/>
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


export default {
  name: 'ImageForm',
  mounted: function (){
    const canvas = glfx.canvas();

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
      }
    }
  },
  methods: {
    async submit(e) {
      this.uploaded = true
      // want to make two copies of the file
      const file = e.target.files[0];
      var image = document.getElementById('transition-img');
      this.cacheImg = URL.createObjectURL(file)
      this.img = URL.createObjectURL(file)
      // want those copies in the db
      const canvas = glfx.canvas();

      image.parentNode.insertBefore(canvas, image);
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      oldCanvas.style.display = 'none'
      this.imgFileName = file.name
    },
    updateColorVal(newVal){
      this.updateVal(newVal);
    },
    updateLightVal(newVal){
      this.updateVal(newVal);
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

      const texture = canvas.texture(originalImg);

      //*** transformations all happen here ***//
      canvas.draw(texture).brightnessContrast((this.brightness.val * .01), (this.contrast.val * .01)).update();

      texture.loadContentsOf(canvas);
      canvas.draw(texture).vibrance((this.vibrance.val * .01)).update();

      texture.loadContentsOf(canvas);
      canvas.draw(texture).hueSaturation((this.hue.val * .01), (this.saturation.val * .01)).update();

      //colors!
      texture.loadContentsOf(canvas);
      canvas.draw(texture).curves([[0,0], [.5, this.red.val * .01], [1,1]], [[0,0], [.5, this.green.val * .01], [1,1]], [[0,0], [.5, this.blue.val * .01], [1,1]]).update();

      texture.destroy();
      imgBucket.removeChild(oldCanvas);
      imgBucket.insertBefore(canvas, transitionImg)
      //need to upload the download button with the new image link
      canvas.toBlob(function downloadMe(e){
        var downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(e)
        downloadLink.download = 'yourNewImage.png'
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
