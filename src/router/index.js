import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import SearchPage from '../views/SearchPage.vue'
import DetailPage from '../views/DetailPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import SignupPage from '../views/SignupPage.vue'
import LoginPageVue from '@/views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: SearchPage,
  },
  {
    path: '/card/:id',
    name: 'cardDetail',
    component: DetailPage,
  },
  {
    path: '/profile',
    name: 'profilePage',
    component: ProfilePage,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPageVue,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated

  if ((to.path === '/login' || to.path === '/signup') && isAuthenticated) {
    next({ name: 'home' })
  } else if (to.path === '/profile' && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
