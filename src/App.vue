<template>
  <ChangeSaturation2/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
//import ChangeColors from './components/ChangeColorForm.vue'
import ChangeSaturation2 from './components/ChangeSaturation2.vue'

export default {
  name: 'App',
  components: {
    //ChangeColors,
    ChangeSaturation2
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wide-slider{
  width: 50%;
}

.hidden{
  display: none;
}
</style>
