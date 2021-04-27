<template>
  <div class="columns is-centered navbar-offset">
    <div class="column is-full">
      <section class="container has-text-centered">
        <div class="content has-text-white hints-section">
          <h3 class="has-text-white">How can I maintain aspect ratio when cropping?</h3>
          <p>Hold Shift!</p>
          <h3 class="has-text-white">How do I move my image around?</h3>
          <p>Double click on the Shape canvas, and try clicking and dragging the image (not the cropbox).
             <br>Try this a couple times as you might be in crop mode or move mode at the time. Please!
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hints'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .hints-section{
    margin-bottom: 400px;
  } */

  .navbar-offset{
    margin-top: 50px;
    height: 70vh;
  }
</style>
