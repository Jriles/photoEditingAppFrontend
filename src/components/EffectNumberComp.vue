<template>
  <div class="columns">
    <div class="column">
      <label for="input" class="label has-text-white">Or</label>
    </div>
    <div class="column is-half">
      <div class="control">
        <input type="number" name="input" v-model="inputVal" @input="emitNewVal" min="-100" max="100" class="input is-small">
      </div>
    </div>
    <div class="column">
      <button class="button is-warning ml-5 is-small" @click="undo">Undo</button>
    </div>
  </div>
</template>

<script>
import glfx from 'glfx';

export default {
  name: "default",
  props: ['name'],
  created(){
    console.log(this.name)
    this.$options.name = this.name
  },
  //needs to match transformation name in ImageForm
  data() {
    return {
      inputVal: 0
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
