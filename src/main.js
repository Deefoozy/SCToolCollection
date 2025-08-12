import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'

import Home from "@/components/Home.vue";
import Splitter from "@/components/Splitter.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/splitter', component: Splitter },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
app.mount('#app')
