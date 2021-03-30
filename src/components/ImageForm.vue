<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <section class="container has-text-centered">
        <div id="img-bucket">
          <img id="main-img" :src="img" :class="hidden"/>
        </div>
        <div class="file">
          <label class="file-label">
            <input class="file-input" type="file" name="photo" @change="submit">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
          </label>
        </div>
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
import glfx from 'glfx';

export default {
  name: 'ImageForm',
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
