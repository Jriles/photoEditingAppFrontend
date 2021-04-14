<template>
  <div class="columns">
    <div class="column">
      <label for="input" class="label has-text-white">{{ name }}</label>
    </div>
    <div class="column is-4">
      <input type="range" name="input" v-model="val" @input="emitNewVal" @mouseup="emitDoneSliding" :min="min" :max="max" class="w-100 mt-2 black-slider">
    </div>
    <div class="column is-1 is-offset-1">
      <input type="number" name="input" v-model="val" @input="emitNewVal" @mouseup="emitDoneSliding" :min="min" :max="max" class="w-100 mt-2 black-slider">
    </div>
    <div class="column">
      <button class="button is-black is-small ml-5 has-text-white" @click="undo">Undo</button>
    </div>
  </div>
</template>

<script>
import glfx from 'glfx';


export default {
  name: "default",
  props: {
    name: String,
    min: {
      default: -100
    },
    max: {
      default: 100
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
    }
  },
  methods: {
    emitNewVal(e){
      this.val = e.target.value
      const changeObj = {
        "newVal": this.val,
        "valType": this.name
      }
      this.$emit('updateVal', changeObj)
    },
    undo(){
      this.val = 0
      const changeObj = {
        "newVal": this.val,
        "valType": this.name
      }
      this.$emit('updateVal', changeObj)
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

</style>
