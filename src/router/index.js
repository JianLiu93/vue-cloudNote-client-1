import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login.vue')
    },
    {
      path: '/notebooks',
      name: 'NotesList',
      component: () => import('@/components/NotesList.vue')
    },
    {
      path: '/note',
      name: 'NoteDetail',
      component: () => import('@/components/NoteDetail.vue')
    },
    {
      path: '/trash',
      name: 'TrashDetail',
      component: () => import('@/components/TrashDetail.vue')
    },
  ]
})
