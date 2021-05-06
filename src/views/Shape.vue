<template>
  <!--crop-->
  <div class="columns mt-4">
    <div v-show="!cropping" class="column">
      <button class="button is-black is-normal" @click="startCropping">Start Cropping</button>
    </div>
    <div class="column" v-show="cropping">
      <button class="button is-black is-normal" @click="emitEvent" name="Save">Save</button>
    </div>
    <div class="column" v-show="cropping">
      <button class="button is-black is-normal" @click="emitEvent" name="Cancel">Cancel</button>
    </div>
    <div class="column" v-show="cropping">
      <button class="button is-black is-normal" @click="emitEvent" name="Aspect Ratio">Reset Crop Aspect Ratio</button>
    </div>
  </div>
  <!--straighten-->
  <div class="columns mt-4">
    <div class="column" v-show="!cropping && !straightening">
      <button class="button is-black is-normal" @click="startStraightening">Start Straightening</button>
    </div>
    <div class="column" v-show="straightening">
      <button class="button is-black is-normal" @click="emitEvent" name="Save">Save</button>
    </div>
    <div class="column" v-show="straightening">
      <button class="button is-black is-normal" @click="emitEvent" name="Cancel">Cancel</button>
    </div>
  </div>
  <div v-show="straightening">
    <effect-slider @doneApplyingChange="doneApplyingChange" name="Straighten Amount" min="-45" max="45" :defaultProp="defaultStraightenAmount" :valProp="straightenAmount"></effect-slider>
  </div>
  <effect-number @doneApplyingChange="doneApplyingChange" name="Rotation" min="-180" max="180" :valProp="rotation" :defaultProp="defaultRotation" :symbol="String.fromCharCode(176)"></effect-number>
  <effect-number @doneApplyingChange="doneApplyingChange" name="Size" min="0" max="1000" :valProp="size" :defaultProp="defaultSize" :symbol="String.fromCharCode(37)"></effect-number>
  <div class="w-100 mt-5">
    <button class="button is-black is-normal" @click="emitEvent" name="Flip Vertically">Flip Vertically</button>
  </div>
  <div class="w-100 mt-3">
    <button class="button is-black is-normal" @click="emitEvent" name="Flip Horizontally">Flip Horizontally</button>
  </div>
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
    cropping: {
      get () {
        return this.$store.state.cropping
      },
      set (value) {
        this.cropping = value
      }
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
    emitEvent (e) {
      this.$emit("eventBus", e.target.name);
    },
    startCropping () {
      this.$store.dispatch('setCropping', true)
    },
    startStraightening () {
      this.$store.dispatch('setStraightening', true)
    },
    doneApplyingChange () {
      this.$emit("doneChangingShape", e.target.name);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
