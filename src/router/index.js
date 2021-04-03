import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Journal from '../views/Journal.vue'
import Checkout from '../views/Checkout.vue'
import ImageForm from '../components/ImageForm.vue'
import Light from '../views/Light.vue'
import Color from '../views/Color.vue'
import Crop from '../views/Crop.vue'
import Shape from '../views/Shape.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/journal',
    name: 'Journal',
    component: Journal
  },
  {
    path: '/transformations',
    component: ImageForm,
    children: [
      {
        path: 'light',
        name: 'light',
        component: Light
      },
      {
        path: 'color',
        name: 'color',
        component: Color
      },
      {
        path: 'crop',
        name: 'crop',
        component: Crop
      },
      {
        path: 'shape',
        name: 'shape',
        component: Shape
      }
    ]
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  }
  //more vues (haha) here
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
