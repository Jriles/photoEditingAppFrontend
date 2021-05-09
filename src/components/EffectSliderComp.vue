<template>
  <div class="mb-1">
    <label for="input" class="label has-text-white tool-name">{{ name }}</label>
  </div>
  <div class="columns is-mobile">
    <div class="column is-two-thirds">
      <input type="range" name="input" v-model="val" @input="emitNewVal" @mouseup="emitDoneSliding" step=".01" :min="min" :max="max" class="w-100 mt-2">
    </div>
    <div class="column is-1">
      <button class="button is-black is-small ml-5 has-text-white" @click="undo"><font-awesome-icon icon="undo" /></button>
    </div>
  </div>
</template>

<script>
import glfx from 'glfx';


export default {
  name: "default",
  emits: [ 'doneApplyingChange'],
  watch: {

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
    undo(){
      this.val = this.default
      this.emitNewVal()
      //this.$emit('doneApplyingChange', changeObj)
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
