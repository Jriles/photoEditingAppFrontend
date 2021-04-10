<template>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="brightness" :valProp="localBrightness"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="contrast" :valProp="localContrast"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="vibrance" :valProp="localVibrance"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="hue" :valProp="localHue"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="saturation" :valProp="localSaturation"></effect-slider>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'

export default {
  name: 'Light',
  props: {
    brightness: {
      default: 0
    },
    contrast: {
      default: 0
    },
    vibrance: {
      default: 0
    },
    hue: {
      default: 0
    },
    saturation: {
      default: 0
    }
  },
  data() {
    return {
      localBrightness: this.brightness,
      localContrast: this.contrast,
      localVibrance: this.vibrance,
      localHue: this.hue,
      localSaturation: this.saturation
    }
  },
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
