<template>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="red"></effect-slider>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="blue"></effect-slider>
  <effect-slider @updateVal="updateColorVal" @doneApplyingChange="doneApplyingChange" name="green"></effect-slider>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'

export default {
  name: 'Color',
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
