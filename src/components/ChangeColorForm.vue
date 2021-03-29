<template>
  <img :src="img"/>
  <p>
    <label for="photo">Select Photo to Upload:</label>
    <input type="file" name="photo" @change="submit">
  </p>
  <div>
    <input type="range" name="redness" @input="changeRed">
    <label for="redness">Red</label>
  </div>
</template>

<script>
import jimp from 'jimp'
export default {
  name: 'ChangeColors',
  props: {
    msg: String
  },
  data() {
    return {
      originalImgFile: null,
      img: null,
      prevSliderAmount: null
    }
  },
  methods: {
    submit(e) {
      console.log('called submit!')
      const file = e.target.files[0];
      this.img = URL.createObjectURL(file);
    },
    changeRed: async function(e) {
      const sliderAmount = e.target.value;
      //this.img = URL.createObjectURL(this.originalImgFile);
      const imgUrlString = String(this.img)
      const image = await jimp.read(imgUrlString);
      image.color([{ apply: 'red', params: [sliderAmount] }]);
      image.getBuffer(jimp.MIME_PNG, (err, binary) => {
        const buffer = binary.buffer;
        this.img = URL.createObjectURL(new Blob([buffer]));
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
