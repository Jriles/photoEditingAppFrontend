<template>
  <div id="img-bucket">
    <img id="main-img" :src="img" :class="hidden"/>
  </div>
  <p>
    <label for="photo">Select Photo to Upload:</label>
    <input type="file" name="photo" @change="submit">
  </p>
  <div>
    <!--<input type="range" name="redness" @input="changeRed" min="0" max="100">-->
    <label for="redness">Saturation</label>
    <input type="range" name="redness" @input="changeRed" min="-100" max="100" class="wide-slider">
  </div>
</template>

<script>
import glfx from 'glfx';

// const DB_NAME = 'photodb'
// const DB_VERSION = 1
// const DB_OBJECT_STORE_NAME = 'photos'

export default {
  name: 'ChangeSaturation',
  props: {
    msg: String
  },
  data() {
    return {
      originalImgFile: null,
      img: null,
      prevSliderAmount: null,
      db: null,
      hidden: null
    }
  },
  methods: {
    async submit(e) {
      console.log('called submit!')
      // want to make two copies of the file
      const file = e.target.files[0];
      var image = document.getElementById('main-img');
      image.src = URL.createObjectURL(file)
      // want those copies in the db
      const canvas = glfx.canvas();

      image.parentNode.insertBefore(canvas, image);
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      oldCanvas.style.display = 'none'
    },
    changeRed(e) {
      this.hidden = 'hidden'
      const imgBucket = document.getElementById('img-bucket');
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      const amount = e.target.value * .01;
      const canvas = glfx.canvas();
      const image = document.getElementById('main-img');
      const texture = canvas.texture(image);
      canvas.draw(texture).brightnessContrast(amount, 0).update();
      imgBucket.removeChild(oldCanvas);
      imgBucket.insertBefore(canvas, image)
      //image.parentNode.removeChild(image);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
