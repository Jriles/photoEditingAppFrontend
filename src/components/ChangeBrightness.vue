<template>
  <div class="mt-5">
    <label for="redness" class="label">Brightness</label>
    <input type="range" name="redness" @input="changeBrightness" min="-100" max="100" class="w-75">
  </div>
</template>

<script>
import glfx from 'glfx';

export default {
  name: 'ChangeBrightness',
  data() {
    return {
    }
  },
  methods: {
    changeBrightness(e) {
      var transitionImg = document.getElementById('transition-img');
      transitionImg.className = 'hidden'
      const imgBucket = document.getElementById('img-bucket');
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      const amount = e.target.value * .01;
      const canvas = glfx.canvas();
      const texture = canvas.texture(transitionImg);
      canvas.draw(texture).brightnessContrast(amount, 0).update();
      imgBucket.removeChild(oldCanvas);
      imgBucket.insertBefore(canvas, transitionImg)

      //need to upload the download button with the new image link
      canvas.toBlob(function downloadMe(e){
        var downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(e)
        downloadLink.download = 'yourNewImage.png'
      });
      //image.parentNode.removeChild(image);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
