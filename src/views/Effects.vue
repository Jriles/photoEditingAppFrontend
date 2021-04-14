<template>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="vibrance" :valProp="localVibrance"></effect-slider>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="hue" :valProp="localHue"></effect-slider>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'

export default {
  name: 'Color',
  emits: ['updateColorVal', 'doneChangingFilter'],
  props: {
    noise: {
      default: 0
    },
    sepia: {
      default: 0
    },
    vignette: {
      default: 0
    },
    red: {
      default: 0
    },
    blue: {
      default: 0
    },
    green: {
      default: 0
    }
  },
  data() {
    return {
      localVibrance: this.vibrance,
      localHue: this.hue,
      localSaturation: this.saturation,
      localRed: this.red,
      localBlue: this.blue,
      localGreen: this.green
    }
  },
  components: {
    'effect-slider': EffectSliderComp
  },
  methods: {
    updateColorVal(newVal) {
      this.$emit("updateColorVal", newVal);
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
