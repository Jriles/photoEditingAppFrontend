<template>
  <!--crop-->
  <div class="columns is-mobile is-multiline" v-show="!cropping && !straightening">
    <div class="column">
      <button class="button is-black is-normal" @click="startCropping"><font-awesome-icon :icon="['fas', 'crop-alt']"/></button>
    </div>
    <div class="column">
      <button class="button is-black is-normal" @click="startStraightening">Straighten</button>
    </div>
    <div class="column">
      <button class="button is-black is-normal" @click="stateChangeButton" name="Flip Vertically">Flip &nbsp;<font-awesome-icon :icon="['fas', 'arrows-alt-v']"/></button>
    </div>
    <div class="column">
      <button class="button is-black is-normal" @click="stateChangeButton" name="Flip Horizontally">Flip &nbsp;<font-awesome-icon :icon="['fas', 'arrows-alt-h']"/></button>
    </div>
  </div>

  <div class="columns is-mobile" v-show="cropping">
    <div class="column">
      <button class="button is-black is-normal" @click="stateChangeButton" name="Save">Save</button>
    </div>
    <div class="column">
      <button class="button is-black is-normal" @click="stateChangeButton" name="Cancel">Cancel</button>
    </div>
  </div>
  <div class="mb-3" v-show="cropping">
    <button class="button is-black is-normal" @click="stateChangeButton" name="Aspect Ratio">Reset Crop Aspect Ratio</button>
  </div>

  <!--straighten-->
  <div class="columns is-mobile" v-show="straightening">
    <div class="column" v-show="straightening">
      <button class="button is-black is-normal" @click="stateChangeButton" name="Save">Save</button>
    </div>
    <div class="column" v-show="straightening">
      <button class="button is-black is-normal" @click="stateChangeButton" name="Cancel">Cancel</button>
    </div>
  </div>
  <div v-show="straightening">
    <effect-slider @doneApplyingChange="doneApplyingChange" name="Straighten Amount" min="-45" max="45" :defaultProp="defaultStraightenAmount" :valProp="straightenAmount"></effect-slider>
  </div>
  <effect-number @doneApplyingChange="doneApplyingChange" name="Rotation" min="-180" max="180" :valProp="rotation" :defaultProp="defaultRotation" :symbol="String.fromCharCode(176)"></effect-number>
  <effect-number @doneApplyingChange="doneApplyingChange" name="Size" min="0" max="1000" :valProp="size" :defaultProp="defaultSize" :symbol="String.fromCharCode(37)"></effect-number>
</template>

<script>
import EffectSliderComp from '../components/EffectSliderComp.vue'
import EffectNumberComp from '../components/EffectNumberComp.vue'

export default {
  name: 'Shape',
  emits: ['doneChangingShape', 'eventBus', 'doneApplyingChange', 'doneChangingFilter'],
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
    'effect-number': EffectNumberComp
  },
  methods: {
    emitEvent (eventName, eventType) {
      const eventDetails = {
        'eventName': eventName,
        'eventType': eventType
      }
      this.$emit("eventBus", eventDetails);
    },
    startCropping () {
      this.$store.dispatch('setCropping', true)
    },
    startStraightening () {
      this.$store.dispatch('setStraightening', true)
    },
    stateChangeButton (e) {
      this.emitEvent(e.target.name, 'Shape Button')
    },
    doneApplyingChange (e) {
      this.emitEvent(e.valType, 'Done Changing Shape')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
