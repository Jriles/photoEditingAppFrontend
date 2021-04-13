<template>
  <effect-slider @updateVal="updateShapeVal" @doneApplyingChange="doneApplyingChange" name="rotation" min="0" max="180" :valProp="localRotation"></effect-slider>
  <effect-slider @updateVal="updateShapeVal" @doneApplyingChange="doneApplyingChange" name="scale" min="0" max="200" :valProp="localScale"></effect-slider>
  <state-button name="Cropping" @changeState="changeStateButton" :valProp="localCropping"></state-button>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'
import EffectNumberComp from '../components/EffectNumberComp.vue'
import StateButtonComp from '../components/StateButtonComp.vue'

export default {
  name: 'Shape',
  props: {
    rotation: {
      default: 0
    },
    scale: {
      default: 100
    },
    cropping: {
      default: false
    }
  },
  data() {
    return {
      localRotation: this.rotation,
      localCropping: this.cropping,
      localScale: this.scale
    }
  },
  components: {
    'effect-slider': EffectSliderComp,
    'effect-number': EffectNumberComp,
    'state-button': StateButtonComp
  },
  methods: {
    updateShapeVal(newVal) {
      this.$emit("updateShapeVal", newVal);
    },
    doneApplyingChange(newVal) {
      this.$emit("doneChangingShape", newVal);
    },
    changeStateButton(newVal) {
      this.$emit("changeStateButton", newVal);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
