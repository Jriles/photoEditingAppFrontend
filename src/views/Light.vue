<template>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="brightness"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="contrast"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="vibrance"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="hue"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="saturation"></effect-slider>
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
    doneApplyingChange(newVal) {
      this.$emit("doneChangingFilter", newVal);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
