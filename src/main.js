import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
require('cropperjs/dist/cropper.js')
require('cropperjs/dist/cropper.css')
require('@/assets/main.scss');
createApp(App).use(router).mount('#app')
