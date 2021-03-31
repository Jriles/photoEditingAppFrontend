import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Journal from '../views/Journal.vue'
import Checkout from '../views/Checkout.vue'
import ImageForm from '../components/ImageForm.vue'
import Light from '../views/Light.vue'
import Color from '../views/Color.vue'

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
        name: 'Light',
        component: Light
      },
      {
        path: 'color',
        name: 'Color',
        component: Color
      },
      // {
      //   path: 'color',
      //   name: 'Size',
      //   component: ChangeSize
      // }
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
