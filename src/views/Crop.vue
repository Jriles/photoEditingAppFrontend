<template>
  <effect-number @updateVal="updateCropAndRotateVal" name="rotation"></effect-number>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'
import EffectNumberComp from '../components/EffectNumberComp.vue'

export default {
  name: 'Crop',
  components: {
    'effect-slider': EffectSliderComp,
    'effect-number': EffectNumberComp
  },
  methods: {
    updateCropAndRotateVal(newVal) {
      this.$emit("updateCrop", newVal);
      this.$emit("shapeCropSliderDone", newVal);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
