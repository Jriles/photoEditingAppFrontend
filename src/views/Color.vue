<template>
  <effect-slider @updateVal="updateColorVal" @sliderDone="sliderDone" name="red"></effect-slider>
  <effect-slider @updateVal="updateColorVal" @sliderDone="sliderDone" name="blue"></effect-slider>
  <effect-slider @updateVal="updateColorVal" @sliderDone="sliderDone" name="green"></effect-slider>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'

export default {
  name: 'Color',
  components: {
    'effect-slider': EffectSliderComp
  },
  methods: {
    updateColorVal(newVal) {
      this.$emit("updateColorVal", newVal);
    },
    sliderDone(newVal) {
      this.$emit("sliderDone", newVal);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
