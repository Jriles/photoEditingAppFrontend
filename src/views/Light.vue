<template>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="brightness" :valProp="localBrightness" :defaultProp="localDefaultBrightness"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="contrast" :valProp="localContrast" :defaultProp="localDefaultContrast"></effect-slider>
  <!-- <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="highlights" :valProp="localHighlights"></effect-slider> -->
  <!-- <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="shadows" :valProp="localShadows"></effect-slider> -->
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="smooth" :valProp="localSmooth" min="0" max="50" :defaultProp="localDefaultSmooth"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="sepia" :valProp="localSepia" min="0" max="100" :defaultProp="localDefaultSepia"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="noise" :valProp="localNoise" min="0" max="100" :defaultProp="localDefaultNoise"></effect-slider>
  <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="ink" :valProp="localInk" min="-100" max="100" :defaultProp="localDefaultInk"></effect-slider>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'

export default {
  name: 'Light',
  emits: ['updateLightVal', 'doneChangingFilter'],
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
    },
    sepia: {
      default: 0
    },
    noise: {
      default: 0
    },
    ink: {
      default: 0
    },
    //defaults
    defaultBrightness: Number,
    defaultContrast: Number,
    defaultSmooth: Number,
    defaultSepia: Number,
    defaultNoise: Number,
    defaultInk: Number
  },
  data() {
    return {
      localBrightness: this.brightness,
      localContrast: this.contrast,
      localHighlights: this.highlights,
      localShadows: this.shadows,
      localSmooth: this.smooth,
      localSepia: this.sepia,
      localNoise: this.noise,
      localInk: this.ink,
      //defaults
      localDefaultBrightness: this.defaultBrightness,
      localDefaultContrast: this.defaultContrast,
      localDefaultSmooth: this.defaultSmooth,
      localDefaultSepia: this.defaultSepia,
      localDefaultNoise: this.defaultNoise,
      localDefaultInk: this.defaultInk
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
