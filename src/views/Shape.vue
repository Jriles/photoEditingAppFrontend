<template>
  <number-slider @updateVal="updateShapeVal" @doneApplyingChange="doneApplyingChange" name="rotation" min="-180" max="180" :valProp="localRotation"></number-slider>
  <number-slider @updateVal="updateShapeVal" @doneApplyingChange="doneApplyingChange" name="size" min="0" max="1000" :valProp="localScale"></number-slider>
  <div class="columns">
    <div class="column is-offset-one-quarter is-one-quarter">
      <signal-button name="Flip Along X" @changeState="changeStateButton"></signal-button>
    </div>
    <div class="column is-one-quarter">
      <signal-button name="Flip Along Y" @changeState="changeStateButton"></signal-button>
    </div>
  </div>
  <effect-slider v-if="straightening" @updateVal="updateShapeVal" @doneApplyingChange="doneApplyingChange" name="straightenAmount" min="-45" max="45" :valProp="localStraightenAmount"></effect-slider>

  <div class="columns mt-4">
    <div class="column" v-if="!straightening && !cropping">
      <state-button enableAction="Start" disableAction="Stop" name="Cropping" @changeState="changeStateButton" :valProp="localCropping"></state-button>
    </div>
    <div class="column" v-if="cropping || straightening">
      <signal-button name="Save" @changeState="changeStateButton"></signal-button>
    </div>
    <div class="column" v-if="cropping || straightening">
      <signal-button name="Cancel" @changeState="changeStateButton"></signal-button>
    </div>
    <div class="column" v-if="cropping">
      <state-button name="Aspect Ratio" enableAction="Reset" disableAction="Reset" @changeState="changeStateButton" :valProp="localCropping"></state-button>
    </div>
    <div class="column" v-if="!cropping && !straightening">
      <state-button enableAction="Start" disableAction="Stop" name="Straightening" @changeState="changeStateButton" :valProp="localStraightening"></state-button>
    </div>
  </div>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'
import EffectNumberComp from '../components/EffectNumberComp.vue'
import StateButtonComp from '../components/StateButtonComp.vue'
import OneWaySignalButton from '../components/OneWaySignalButton.vue'
import NumberSliderComp from '../components/NumberSliderComp.vue'

export default {
  name: 'Shape',
  emits: ['updateShapeVal', 'doneChangingShape', 'changeStateButton'],
  props: {
    rotation: {
      default: 0
    },
    size: {
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
      localScale: this.size,
      localStraightening: this.straightening,
      localStraightenAmount: this.straightenAmount
    }
  },
  components: {
    'effect-slider': EffectSliderComp,
    'effect-number': EffectNumberComp,
    'state-button': StateButtonComp,
    'signal-button': OneWaySignalButton,
    'number-slider': NumberSliderComp
  },
  methods: {
    updateShapeVal(newVal) {
      console.log(newVal)
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
