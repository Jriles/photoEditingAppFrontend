<template>
  <nav class="navbar is-fixed-top has-background-grey-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand ml-4">
      <router-link class="has-text-white has-background-grey-dark" to="/transformations/light">
        <img src="@/assets/img/eazysnap_white_transparent.png" class="logo">
      </router-link>
      <router-link v-show="!mobileMode" class="navbar-item has-text-white has-background-grey-dark brand-text" to="/transformations/light">
        EazySnap
      </router-link>
      <router-link to="/transformations/light" class="navbar-item has-text-white has-background-grey-dark pt-3">
        Light
      </router-link>
      <router-link to="/transformations/color" class="navbar-item has-text-white has-background-grey-dark pt-3">
        Color
      </router-link>
      <router-link to="/transformations/shape" class="navbar-item has-text-white has-background-grey-dark pt-3">
        Shape
      </router-link>

      <a role="button" class="navbar-burger" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span class="has-text-white" aria-hidden="true"></span>
        <span class="has-text-white" aria-hidden="true"></span>
        <span class="has-text-white" aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu has-background-grey-dark" v-bind:class="{ 'is-active' : showNav }">
      <div class="navbar-start has-text-white">
        <router-link to="/hints" class="navbar-item has-text-white has-background-grey-dark pt-3">
          Hints
        </router-link>
        <a href="tel:+1206-724-7800" class="navbar-item has-text-white has-background-grey-dark pt-3">Help & Feedback</a>
      </div>

      <!-- No ads v2 -->
      <!-- <div class="navbar-end has-background-grey-dark">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/checkout" class="button is-primary">
              <strong>No Ads</strong>
            </router-link>
          </div>
        </div>
      </div> -->
    </div>
  </nav>
  <router-view/>
  <footer class="footer has-background-grey-dark">
    <div class="content has-text-centered has-background-grey-dark">
      <!-- Your share button code -->
      <div class="buttons is-centered">
        <div class="fb-share-button"
        data-href="<%= BASE_URL %>transformations/light"
        data-layout="button" size="large" lazy="true">
        </div>
        <a class="twitter-share-button"
          href="https://twitter.com/intent/tweet?text=Check%20out%3A%20https%3A%2F%2Feazysnap.com!">
        <button class="button is-small is-black"><font-awesome-icon :icon="['fab', 'twitter']" />&nbsp;Tweet!</button></a>
        <a href="https://cloud.google.com/sustainability"><button class="button is-small is-success">Sustainability</button></a>
      </div>
      <p class="has-text-white">
        Please bookmark EazySnap if you like it!
        <br>
        <br>
        <br>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    desktopMode: function () {
      return this.$store.state.desktopMode
    },
    tabletMode: function () {
      return this.$store.state.tabletMode
    },
    mobileMode: function () {
      return this.$store.state.mobileMode
    },
  },
  data() {
    return {
      showNav: false
    }
  }
}
</script>

<style lang="scss">
  .logo {
    height: 45px;
    padding-top: 5px;
  }

  @font-face {
    font-family: "Helvetica";
    src: url("~@/assets/fonts/helvetica.woff") format("woff");
  }

  @font-face {
    font-family: "RobotoSlabExtraLight";
    src: url("~@/assets/fonts/RobotoSlab-ExtraLight.woff") format("woff");
  }

  .fb-share-button{
    margin-bottom: 6px;
  }

  .brand-text{
    font-family: 'RobotoSlabExtraLight' !important;
    font-size: 20px;
  }

  button:hover{
    background-color: white !important;
    color: black !important;
  }

  .navbar-item:hover{
    background-color: black !important;
  }

  .navbar-item:focus{
    background-color: black !important;
  }

  .tool-name{
    text-transform: capitalize;
  }

  .hidden{
    display: none;
  }

  .showing{
    display: inline;
  }

  .w-100{
    width: 100%;
  }

  .w-75{
    width: 75%;
  }

  body{
    background-color: #4A4A4A;
    font-family: 'Helvetica' !important;
    //height: 200vh;
  }

  input[type=range] {
    height: 25px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
    background-color: #4A4A4A;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: black;
    border-radius: 1px;
    border: 0px solid #000000;
  }

  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid white;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: black;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: black;
  }

  input[type=range]::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: black;
    border-radius: 1px;
    border: 0px solid #000000;
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid white;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: black;
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: black;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type=range]::-ms-fill-upper {
    background: black;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid white;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: black;
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: black;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: black;
  }

  //bulma columns class broken iOS
  body { overflow-x: hidden; }

</style>
