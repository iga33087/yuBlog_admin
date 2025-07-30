import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { useStore } from './store/index.js'
import api from './assets/js/api.js'
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

router.beforeEach(async (to,from,next) => {
  const store = useStore();
  if(to.name==='Login') next()
  else {
    if(localStorage.token) {
      try {
        store.userData=await api.verify()
        //await store.initData()
        next()
      }
      catch(err) {
        localStorage.token=''
        next({name:'Login'})
      }
    }
    else {
      next({name:'Login'})
    }
  }
})

router.afterEach((to,from,next) => {
  const store = useStore();
  store.path=to.name
  next()
})

app.use(createPinia()).use(ElementPlus).use(router).mount('#app')
