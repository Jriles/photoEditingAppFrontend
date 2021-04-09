<template>
  <div class="columns">
    <div class="column">
      <label for="input" class="label">{{ name }}</label>
    </div>
    <div class="column is-half">
      <input type="range" name="input" v-model="inputVal" @input="emitNewVal" @change="emitDoneSliding" :min="min" :max="max" class="w-100 mt-2">
    </div>
    <div class="column">
      <button class="button is-warning is-small ml-5" @click="undo">Undo</button>
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
      type: Number,
      default: -100
    },
    max: {
      type: Number,
      default: 100
    }
  },
  created(){
    console.log(this.name)
    this.$options.name = this.name
  },
  //needs to match transformation name in ImageForm
  data() {
    return {
      inputVal: 0,
    }
  },
  methods: {
    emitNewVal(e){
      const changeObj = {
        "newVal": e.target.value,
        "valType": this.name
      }
      this.$emit('updateVal', changeObj)
    },
    undo(){
      this.inputVal = 0
      const changeObj = {
        "newVal": this.inputVal,
        "valType": this.name
      }
      this.$emit('updateVal', changeObj)
    },
    emitDoneSliding(e){
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
