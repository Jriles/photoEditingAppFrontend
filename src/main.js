import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
require('cropperjs/dist/cropper.js')
require('cropperjs/dist/cropper.css')
require('@/assets/main.scss');

library.add(faUndo)

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount('#app')
