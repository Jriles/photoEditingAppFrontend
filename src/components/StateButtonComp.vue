<template>
  <div class="columns">
    <div class="column">
      <button v-if="!val" class="button is-black is-normal" @click="changeState">{{ localEnableAction + " " + localName }}</button>
      <button v-else class="button is-black is-normal" @click="changeState">{{ localDisableAction + " " + localName }}</button>
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
    enableAction: String,
    disableAction: String,
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
  // created(){
  //   console.log(this.$options.name)
  //   console.log('name in created: ' + this.name)
  //   this.$options.name = this.name
  // },
  //needs to match transformation name in ImageForm
  data() {
    return {
      val: this.valProp,
      localEnableAction: this.enableAction,
      localDisableAction: this.disableAction,
      localName: this.name
    }
  },
  methods: {
    //for example cropping mode on
    changeState(e){
      this.val = !this.val
      const changeObj = {
        "valType": this.localName
      }
      this.$emit('changeState', changeObj)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
