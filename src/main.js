import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUndo, faFileDownload, faFileUpload, faImage, faCropAlt, faArrowsAltV, faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { faImage as faRegImage } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import VueGtag from "vue-gtag-next";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

require('cropperjs/dist/cropper.js')
require('cropperjs/dist/cropper.css')
require('@/assets/main.scss');

library.add(faTwitter)
library.add(faUndo)
library.add(faFileDownload)
library.add(faFileUpload)
library.add(faImage)
library.add(faRegImage)
library.add(faCropAlt)
library.add(faArrowsAltH)
library.add(faArrowsAltV)

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .use(VueGtag, {
    property: {
      id: "G-TRCHPWLB7Y",
      params: {
        send_page_view: false
      }
    }
  })
  .mount('#app')
