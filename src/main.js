import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

require('cropperjs/dist/cropper.js')
require('cropperjs/dist/cropper.css')
require('@/assets/main.scss');

library.add(faTwitter)
library.add(faUndo)

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app')
