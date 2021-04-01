<template>
  <effect-slider @updateVal="updateLightVal" name="brightness"></effect-slider>
  <effect-slider @updateVal="updateLightVal" name="contrast"></effect-slider>
  <effect-slider @updateVal="updateLightVal" name="vibrance"></effect-slider>
  <effect-slider @updateVal="updateLightVal" name="hue"></effect-slider>
  <effect-slider @updateVal="updateLightVal" name="saturation"></effect-slider>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
