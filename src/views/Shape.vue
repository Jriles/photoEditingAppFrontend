<template>
  <effect-slider @updateVal="updateShapeVal" @doneApplyingChange="doneApplyingChange" name="rotation" min="0" max="180" :valProp="localRotation"></effect-slider>
  <effect-slider @updateVal="updateShapeVal" @doneApplyingChange="doneApplyingChange" name="scale" min="0" max="200" :valProp="localScale"></effect-slider>
  <effect-slider v-if="straightening" @updateVal="updateShapeVal" @doneApplyingChange="doneApplyingChange" name="straightenAmount" min="-45" max="45" :valProp="localStraightenAmount"></effect-slider>
  <div class="columns mt-4">
    <div class="column" v-if="!straightening">
      <state-button enableAction="Start" disableAction="Stop" name="Cropping" @changeState="changeStateButton" :valProp="localCropping"></state-button>
    </div>
    <div class="column" v-if="cropping">
      <state-button name="Aspect Ratio" enableAction="Reset" disableAction="Reset" @changeState="changeStateButton" :valProp="localCropping"></state-button>
    </div>
    <div class="column" v-if="!cropping">
      <state-button enableAction="Start" disableAction="Stop" name="Straightening" @changeState="changeStateButton" :valProp="localStraightening"></state-button>
    </div>
  </div>
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
    },
    straightening: {
      default: false
    },
    straightenAmount: {
      default: false
    }
  },
  data() {
    return {
      localRotation: this.rotation,
      localCropping: this.cropping,
      localScale: this.scale,
      localStraightening: this.straightening,
      localStraightenAmount: this.straightenAmount
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
