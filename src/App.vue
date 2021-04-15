<template>
  <nav class="navbar has-background-grey-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/transformations/light">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start has-text-white">
        <router-link to="/transformations/light" class="navbar-item has-text-white has-background-grey-dark">
          Light
        </router-link>
        <router-link to="/transformations/color" class="navbar-item has-text-white has-background-grey-dark">
          Color
        </router-link>
        <router-link to="/transformations/shape" class="navbar-item has-text-white has-background-grey-dark">
          Shape
        </router-link>
        <router-link to="/hints" class="navbar-item has-text-white has-background-grey-dark">
          Hints
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/checkout" class="button is-primary">
              <strong>No Ads</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <router-view/>
  <footer class="footer has-background-grey-dark">
    <div class="content has-text-centered has-background-grey-dark">
      <p>
        <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
        is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
      </p>
    </div>
  </footer>
</template>

<style lang="scss">
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

</style>
