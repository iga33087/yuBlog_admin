import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title:'Dashboard',
      icon:'',
      //show:true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title:'Login',
      //show:true
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/articles',
    name: 'Articles',
    meta: {
      title:'Articles',
      icon:'',
      //show:true
    },
    component: () => import('../views/Articles.vue')
  },
  {
    path: '/classtypes',
    name: 'Classtypes',
    meta: {
      title:'Classtypes',
      icon:'',
      //show:true
    },
    component: () => import('../views/Classtypes.vue')
  },
  {
    path: '/members',
    name: 'Members',
    meta: {
      title:'Members',
      icon:'',
      //show:true
    },
    component: () => import('../views/Members.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
