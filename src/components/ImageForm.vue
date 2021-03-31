<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <section class="container has-text-centered">
        <div id="img-bucket">
          <img id="transition-img"/>
          <div>
            <img id="original-img" v-show="originalVisible" :src="img"/>
          </div>
        </div>
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
      originalVisible: false,
      img: null,
      uploaded: false,
      imgFileName: null
    }
  },
  methods: {
    async submit(e) {
      this.uploaded = true
      console.log('called submit!')
      // want to make two copies of the file
      const file = e.target.files[0];
      var image = document.getElementById('transition-img');
      image.src = URL.createObjectURL(file)
      this.img = image.src
      // want those copies in the db
      const canvas = glfx.canvas();

      image.parentNode.insertBefore(canvas, image);
      const oldCanvas = document.getElementsByTagName("canvas")[0];
      oldCanvas.style.display = 'none'
      this.imgFileName = file.name
    },
    download(e){
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
