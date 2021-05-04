<template>
  <!--crop-->
  <div class="columns mt-4">
    <div class="column" v-if="!straightening && !cropping">
      <state-button enableAction="Start" disableAction="Stop" name="Cropping" @changeState="changeStateButton" :valProp="cropping"></state-button>
    </div>
    <div class="column" v-if="cropping">
      <signal-button name="Save" @changeState="changeStateButton"></signal-button>
    </div>
    <div class="column" v-if="cropping">
      <signal-button name="Cancel" @changeState="changeStateButton"></signal-button>
    </div>
    <div class="column" v-if="cropping">
      <state-button name="Aspect Ratio" enableAction="Reset" disableAction="Reset" @changeState="changeStateButton" :valProp="cropping"></state-button>
    </div>
  </div>
  <!--straighten-->
  <div class="columns mt-4">
    <div class="column" v-if="!cropping && !straightening">
      <state-button enableAction="Start" disableAction="Stop" name="Straightening" :valProp="straightening"></state-button>
    </div>
    <div class="column" v-if="straightening">
      <signal-button name="Save" @changeState="changeStateButton"></signal-button>
    </div>
    <div class="column" v-if="straightening">
      <signal-button name="Cancel" @changeState="changeStateButton"></signal-button>
    </div>
  </div>
  <effect-slider v-if="straightening" @updateVal="updateShapeVal" @doneApplyingChange="doneApplyingChange" name="StraightenAmount" min="-45" max="45" :defaultProp="defaultStraightenAmount" :valProp="straightenAmount"></effect-slider>
  <effect-number @doneApplyingChange="doneApplyingChange" name="Rotation" min="-180" max="180" :valProp="rotation" :defaultProp="defaultRotation" :symbol="String.fromCharCode(176)"></effect-number>
  <effect-number @doneApplyingChange="doneApplyingChange" name="Size" min="0" max="1000" :valProp="size" :defaultProp="defaultSize" :symbol="String.fromCharCode(37)"></effect-number>
  <div class="w-100 mt-5">
    <signal-button name="Flip Along X" @changeState="changeStateButton"></signal-button>
  </div>
  <div class="w-100 mt-3">
    <signal-button name="Flip Along Y" @changeState="changeStateButton"></signal-button>
  </div>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'
import EffectNumberComp from '../components/EffectNumberComp.vue'
import StateButtonComp from '../components/StateButtonComp.vue'
//signal buttons dont affect state, they just submit signals like save or cancel.
import OneWaySignalButton from '../components/OneWaySignalButton.vue'

export default {
  name: 'Shape',
  emits: ['doneChangingShape', 'changeStateButton'],
  computed: {
    size: function () {
      return this.$store.state.size
    },
    rotation: function () {
      return this.$store.state.rotation
    },
    cropping: function () {
      return this.$store.state.cropping
    },
    cropped: function () {
      return this.$store.state.cropped
    },
    straightening: function () {
      return this.$store.state.straightening
    },
    straightenAmount: function () {
      return this.$store.state.straightenAmount
    },
    //defaults
    defaultRotation: function () {
      return this.$store.state.defaultRotation
    },
    defaultSize: function () {
      return this.$store.state.defaultSize
    },
    defaultSizeX: function () {
      return this.$store.state.defaultSizeX
    },
    defaultSizeY: function () {
      return this.$store.state.defaultSizeY
    },
    defaultStraightenAmount: function () {
      return this.$store.state.defaultStraightenAmount
    },
    defaultCropSize: function () {
      return this.$store.state.defaultCropSize
    },
    defaultCropping: function () {
      return this.$store.state.defaultCropping
    },
    defaultCropped: function () {
      return this.$store.state.defaultCropped
    },
    defaultStraightening: function () {
      return this.$store.state.defaultStraightening
    },
    defaultStraigtened: function () {
      return this.$store.state.defaultStraigtened
    }
  },
  components: {
    'effect-slider': EffectSliderComp,
    'effect-number': EffectNumberComp,
    'state-button': StateButtonComp,
    'signal-button': OneWaySignalButton
  },
  methods: {
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
