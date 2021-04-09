<template>
  <effect-slider @updateVal="updateShapeVal" @doneApplyingChange="doneApplyingChange" name="rotation" min="0" max="180"></effect-slider>
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
    doneApplyingChange(newVal) {
      this.$emit("doneChangingShape", newVal);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
