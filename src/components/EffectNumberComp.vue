<template>
  <div class="mb-1">
    <label for="input" class="label has-text-white tool-name">{{ name }}</label>
  </div>
  <div class="columns">
    <div class="column is-half">
      <input type="number" name="input" v-model="val" @input="emitNewVal" @mouseup="emitDoneSliding" :min="min" :max="max" class="w-50">
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
  watch: {

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
    }

  },
  created(){
    this.$options.name = this.name
    console.log(this.defaultProp)
  },
  //needs to match transformation name in ImageForm
  data() {
    return {
      val: this.valProp,
      default: this.defaultProp
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
      console.log(this.default)
      this.val = this.default
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
