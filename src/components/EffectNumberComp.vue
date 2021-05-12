<template>
  <div v-if="desktopMode || tabletMode">
    <div class="mb-1">
      <label for="input" class="label has-text-white tool-name">{{ name + " " + symbol }}</label>
    </div>
    <div class="columns is-mobile">
      <div class="column is-two-thirds">
        <input type="number" name="input" v-model="val" @input="emitNewVal" :min="min" :max="max" class="w-50">
      </div>
      <div class="column is-1">
        <button class="button is-black is-small ml-5 has-text-white" @click="undo"><font-awesome-icon icon="undo" /></button>
      </div>
    </div>
  </div>
  <div v-if="mobileMode">
    <div class="columns is-mobile">
      <div class="column is-one-third">
        <label for="input" class="label has-text-white tool-name">{{ name + " " + symbol }}</label>
      </div>

      <div class="column is-one-third">
        <input type="number" name="input" v-model="val" @input="emitNewVal" :min="min" :max="max">
      </div>
      <div class="column is-5">
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
  },
  props: {
    name: String,
    defaultProp: Number,
    min: {
      default: -100
    },
    max: {
      default: 100
    },
    valProp: {
      default: 0
    },
    symbol: String
  },
  created(){
    this.$options.name = this.name
    console.log(this.defaultProp)
  },
  //needs to match transformation name in ImageForm
  data() {
    return {
      val: this.valProp,
      default: this.defaultProp,
      localSymbol: this.symbol
    }
  },
  methods: {
    emitNewVal(e){
      this.$store.dispatch('set' + this.name, this.val)
      this.emitDoneSliding(e)
    },
    undo(){
      this.val = this.default
      this.emitNewVal()
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

</style>
