<template>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="vibrance" :valProp="localVibrance" :defaultProp="localDefaultVibrance"></effect-slider>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="hue" :valProp="localHue" :defaultProp="localDefaultHue"></effect-slider>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="saturation" :valProp="localSaturation" :defaultProp="localDefaultSaturation"></effect-slider>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="red" min="0" max="100" :valProp="localRed" :defaultProp="localDefaultRed"></effect-slider>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="blue" min="0" max="100" :valProp="localBlue" :defaultProp="localDefaultBlue"></effect-slider>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="green" min="0" max="100" :valProp="localGreen" :defaultProp="localDefaultGreen"></effect-slider>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'

export default {
  name: 'Color',
  emits: ['updateColorVal', 'doneChangingFilter'],
  props: {
    vibrance: {
      default: 0
    },
    hue: {
      default: 0
    },
    saturation: {
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
    },
    //defaults
    defaultVibrance: Number,
    defaultHue: Number,
    defaultSaturation: Number,
    defaultRed: Number,
    defaultBlue: Number,
    defaultGreen: Number
  },
  data() {
    return {
      localVibrance: this.vibrance,
      localHue: this.hue,
      localSaturation: this.saturation,
      localRed: this.red,
      localBlue: this.blue,
      localGreen: this.green,
      //default
      localDefaultVibrance: this.defaultVibrance,
      localDefaultHue: this.defaultHue,
      localDefaultSaturation: this.defaultSaturation,
      localDefaultRed: this.defaultRed,
      localDefaultBlue: this.defaultBlue,
      localDefaultGreen: this.defaultGreen
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
