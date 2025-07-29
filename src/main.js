import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { useStore } from './store/index.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import './assets/css/index.scss'
import App from './App.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia()).use(ElementPlus).use(router).mount('#app')
