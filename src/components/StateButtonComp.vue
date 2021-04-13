<template>
  <div class="columns">
    <div class="column">
      <button v-if="!val" class="button is-success is-medium" @click="changeState">Start {{ $options.name }}</button>
      <button v-else class="button is-success is-medium" @click="changeState">Stop {{ $options.name }}</button>
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
      default: false
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
    //for example cropping mode on
    changeState(e){
      this.val = !this.val
      const changeObj = {
        "valType": this.name
      }
      this.$emit('changeState', changeObj)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
