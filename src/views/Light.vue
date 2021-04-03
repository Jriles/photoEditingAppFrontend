<template>
  <effect-slider @updateVal="updateLightVal" @sliderDone="sliderDone" name="brightness"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @sliderDone="sliderDone" name="contrast"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @sliderDone="sliderDone" name="vibrance"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @sliderDone="sliderDone" name="hue"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @sliderDone="sliderDone" name="saturation"></effect-slider>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'

export default {
  name: 'Light',
  components: {
    'effect-slider': EffectSliderComp
  },
  methods: {
    updateLightVal(newVal) {
      this.$emit("updateLightVal", newVal);
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
