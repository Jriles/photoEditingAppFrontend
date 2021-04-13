<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
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
      <div class="navbar-start">
        <router-link to="/transformations/light" class="navbar-item">
          Light
        </router-link>
        <router-link to="/transformations/color" class="navbar-item">
          Color
        </router-link>
        <router-link to="/transformations/shape" class="navbar-item">
          Shape
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
</style>
