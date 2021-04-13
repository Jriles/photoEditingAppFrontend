<template>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="brightness" :valProp="localBrightness"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="contrast" :valProp="localContrast"></effect-slider>
  <!-- <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="highlights" :valProp="localHighlights"></effect-slider> -->
  <!-- <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="shadows" :valProp="localShadows"></effect-slider> -->
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="smooth" :valProp="localSmooth" min="0" max="50"></effect-slider>
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
    highlights: {
      default: 0
    },
    shadows: {
      default: 0
    },
    smooth: {
      default: 0
    }
  },
  data() {
    return {
      localBrightness: this.brightness,
      localContrast: this.contrast,
      localHighlights: this.highlights,
      localShadows: this.shadows,
      localSmooth: this.smooth
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
