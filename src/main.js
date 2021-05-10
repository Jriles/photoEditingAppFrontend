import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUndo, faFileDownload, faFileUpload, faImage } from "@fortawesome/free-solid-svg-icons";
import { faImage as faRegImage } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

require('cropperjs/dist/cropper.js')
require('cropperjs/dist/cropper.css')
require('@/assets/main.scss');
//require("@/assets/img/tablet/manWCatTablet.jpg")

library.add(faTwitter)
library.add(faUndo)
library.add(faFileDownload)
library.add(faFileUpload)
library.add(faImage)
library.add(faRegImage)


import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app')
