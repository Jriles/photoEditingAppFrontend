<template>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Brightness" :valProp="brightness" :defaultProp="defaultBrightness"></effect-slider>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Contrast" :valProp="contrast" :defaultProp="defaultContrast"></effect-slider>
  <!-- <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="highlights" :valProp="localHighlights"></effect-slider> -->
  <!-- <effect-slider @updateVal="updateLightVal" @doneApplyingChange="doneApplyingChange" name="shadows" :valProp="localShadows"></effect-slider> -->
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Sepia" :valProp="sepia" min="0" max="1" :defaultProp="defaultSepia"></effect-slider>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Noise" :valProp="noise" min="0" max="1" :defaultProp="defaultNoise"></effect-slider>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Ink" :valProp="ink" :defaultProp="defaultInk"></effect-slider>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Smooth" :valProp="smooth" min="0" max="50" :defaultProp="defaultSmooth"></effect-slider>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'

export default {
  name: 'Light',
  emits: [ 'doneChangingFilter', 'doneChangingShape', 'doneApplyingChange', 'eventBus'],
  computed: {
    brightness: function () {
      return this.$store.state.brightness
    },
    contrast: function () {
      return this.$store.state.contrast
    },
    smooth: function () {
      return this.$store.state.smooth
    },
    sepia: function () {
      return this.$store.state.sepia
    },
    noise: function () {
      return this.$store.state.noise
    },
    ink: function () {
      return this.$store.state.ink
    },
    //defaults
    defaultBrightness: function () {
      return this.$store.state.defaultBrightness
    },
    defaultContrast: function () {
      return this.$store.state.defaultContrast
    },
    defaultSmooth: function () {
      return this.$store.state.defaultSmooth
    },
    defaultSepia: function () {
      return this.$store.state.defaultSepia
    },
    defaultNoise: function () {
      return this.$store.state.defaultNoise
    },
    defaultInk: function () {
      return this.$store.state.defaultInk
    }
  },
  components: {
    'effect-slider': EffectSliderComp
  },
  methods: {
    doneApplyingChange(e) {
      this.$emit("doneChangingFilter", e.valType);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
