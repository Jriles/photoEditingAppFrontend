<template>
  <div v-if="desktopMode || tabletMode || largeDesktopMode || ultrawideMode">
    <div>
      <h6 for="input" class="label has-text-white tool-name">{{ name }}</h6>
    </div>
    <div class="columns is-mobile">
      <div class="column is-narrow is-two-thirds">
        <input type="range" name="input" v-model="val" @input="emitNewVal" @mouseup="emitDoneSliding" step=".01" :min="min" :max="max" class="w-100">
      </div>
      <div class="column is-narrow is-1">
        <button class="button is-black is-small ml-3 has-text-white" @click="undo"><font-awesome-icon icon="undo" /></button>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="columns is-mobile">
      <div class="column is-one-third is-narrow">
        <h6 for="input" class="label has-text-white tool-name">{{ name }}</h6>
      </div>
      <div class="column">
        <input type="range" name="input" v-model="val" @input="emitNewVal" @mouseup="emitDoneSliding" step=".01" :min="min" :max="max" class="w-100 mobile-input">
      </div>
      <div class="column is-3 is-narrow">
        <button class="button is-black is-small has-text-white" @click="undo"><font-awesome-icon icon="undo" /></button>
      </div>
    </div>
  </div>
</template>

<script>
import glfx from 'glfx';

export default {
  name: "default",
  emits: [ 'doneApplyingChange'],
  computed: {
    desktopMode: function () {
      return this.$store.state.desktopMode
    },
    tabletMode: function () {
      return this.$store.state.tabletMode
    },
    mobileMode: function () {
      return this.$store.state.mobileMode
    },
    ultrawideMode: function () {
      return this.$store.state.ultrawideMode
    },
    largeDesktopMode: function () {
      return this.$store.state.largeDesktopMode
    }
  },
  props: {
    name: String,
    defaultProp: Number,
    min: {
      default: -1
    },
    max: {
      default: 1
    },
    valProp: {
      default: 0
    }
  },
  created(){
    this.$options.name = this.name
  },
  //needs to match transformation name in ImageForm
  data() {
    return {
      val: this.valProp,
      default: this.defaultProp
    }
  },
  methods: {
    emitNewVal(){
      const property = "set" + this.name.split(" ").join("")
      this.$store.dispatch(property, this.val)
    },
    undo(e){
      this.val = this.default
      this.emitNewVal()
      const changeObj = {
        "newVal": this.val,
        "valType": this.name
      }
      this.$emit('doneApplyingChange', changeObj)
    },
    emitDoneSliding(e){
      this.val = e.target.value
      const changeObj = {
        "newVal": e.target.value,
        "valType": this.name
      }
      this.$emit('doneApplyingChange', changeObj)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mobile-input {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .column {
    padding-top: 8px;
    padding-bottom: 8px;
  }
</style>
