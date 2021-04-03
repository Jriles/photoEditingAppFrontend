<template>
  <effect-slider @updateVal="updateShapeVal" @sliderDone="sliderDone" name="rotation" min="-360" max="360"></effect-slider>
  <!-- <effect-slider @updateVal="updateShapeVal" name="size"></effect-number> -->
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'
import EffectNumberComp from '../components/EffectNumberComp.vue'

export default {
  name: 'Shape',
  components: {
    'effect-slider': EffectSliderComp,
    'effect-number': EffectNumberComp
  },
  methods: {
    updateShapeVal(newVal) {
      this.$emit("updateShapeVal", newVal);
    },
    sliderDone(newVal) {
      this.$emit("sliderDone", newVal);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
