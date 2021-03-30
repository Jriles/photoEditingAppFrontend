<template>
  <div>
    <label for="redness">Brightness</label>
    <input type="range" name="redness" @input="changeBrightness" min="-100" max="100" class="wide-slider">
  </div>
</template>

<script>
import glfx from 'glfx';

export default {
  name: 'ChangeBrightness',
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
    changeBrightness(e) {
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
