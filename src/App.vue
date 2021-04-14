<template>
  <nav class="navbar has-background-grey-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
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
    height: 200vh;
  }
</style>
