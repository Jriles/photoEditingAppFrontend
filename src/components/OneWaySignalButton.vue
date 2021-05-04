<template>
  <div class="columns">
    <div class="column">
      <button v-if="!val" class="button is-black is-normal" @click="changeState">{{ name }}</button>
      <button v-else class="button is-black is-normal" @click="changeState">{{ name }}</button>
    </div>
  </div>
</template>

<script>
import glfx from 'glfx';


export default {
  name: "default",
  props: {
    name: String,
    //example "Start" or "Stop" or Toggle
  },
  data() {
    return {
      val: this.valProp
    }
  },
  created(){
    this.$options.name = this.name
  },
  methods: {
    //for example cropping mode on
    changeState(e){
      this.val = !this.val
      this.$store.dispatch('set' + this.name, this.val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
