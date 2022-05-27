import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login.vue'
import NotesList from '@/components/NotesList.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import TrashDetail from '@/components/TrashDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/notebooks',
      name: 'NotesList',
      component: NotesList
    },
    {
      path: '/note',
      name: 'NoteDetail',
      component: NoteDetail
    },
    {
      path: '/trash',
      name: 'TrashDetail',
      component: TrashDetail
    },
  ]
})
