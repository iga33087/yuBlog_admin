import { createRouter, createWebHistory } from 'vue-router'

const routes = [
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
    path: '/tags',
    name: 'Tags',
    meta: {
      title:'Tags',
      icon:'',
      //show:true
    },
    component: () => import('../views/Tags.vue')
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
  {
    path: '/system',
    name: 'System',
    meta: {
      title:'System',
      icon:'',
      //show:true
    },
    component: () => import('../views/System.vue')
  },
  {
    path: '/',
    redirect: { name: 'Articles' }
  },
]

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
})

export default router
