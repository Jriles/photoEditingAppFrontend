<template>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Vibrance" :valProp="vibrance" :defaultProp="defaultVibrance"></effect-slider>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Hue" :valProp="hue" :defaultProp="defaultHue"></effect-slider>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Saturation" :valProp="saturation" :defaultProp="defaultSaturation"></effect-slider>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Red" min="0" max="100" :valProp="red" :defaultProp="defaultRed"></effect-slider>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Blue" min="0" max="100" :valProp="blue" :defaultProp="defaultBlue"></effect-slider>
  <effect-slider @doneApplyingChange="doneApplyingChange" name="Green" min="0" max="100" :valProp="green" :defaultProp="defaultGreen"></effect-slider>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'

export default {
  name: 'Color',
  emits: ['doneChangingFilter', 'doneChangingShape', 'doneApplyingChange', 'eventBus'],
  computed: {
    vibrance: function () {
      return this.$store.state.vibrance
    },
    hue: function () {
      return this.$store.state.hue
    },
    saturation: function () {
      return this.$store.state.saturation
    },
    red: function () {
      return this.$store.state.red
    },
    blue: function () {
      return this.$store.state.blue
    },
    green: function () {
      return this.$store.state.green
    },
    //defaults
    defaultVibrance: function () {
      return this.$store.state.defaultVibrance
    },
    defaultHue: function () {
      return this.$store.state.defaultHue
    },
    defaultSaturation: function () {
      return this.$store.state.defaultSaturation
    },
    defaultRed: function () {
      return this.$store.state.defaultRed
    },
    defaultBlue: function () {
      return this.$store.state.defaultBlue
    },
    defaultGreen: function () {
      return this.$store.state.defaultGreen
    }
  },
  components: {
    'effect-slider': EffectSliderComp
  },
  methods: {
    doneApplyingChange(newVal) {
      this.$emit("doneChangingFilter");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
