<template>
  <brightness></brightness>
</template>

<script>
import ChangeBrightness from '../components/ChangeBrightness.vue'

export default {
  name: 'Light',
  components: {
    'brightness': ChangeBrightness
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
