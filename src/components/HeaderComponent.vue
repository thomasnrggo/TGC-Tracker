<template>
  <div class="container flex justify-between w-full mx-auto">
    <router-link to="/">
      <h1 class="text-3xl font-semibold text-gray-100 m-0">
        Pokemon TCG Tracker
      </h1>
    </router-link>
    <nav class="capitalize">
      <router-link v-if="isAuthenticated && !isProfilePage" to="/profile"
        >Profile</router-link
      >
      <button v-if="isAuthenticated && isProfilePage" @click="logout">
        Logout
      </button>
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    </nav>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const isAuthenticated = computed(() => store.getters.isAuthenticated)

    const route = useRoute()
    const router = useRouter()
    const isProfilePage = computed(() => route.path === '/profile')

    const logout = () => {
      store.dispatch('logout').then(() => {
        if (isProfilePage.value) {
          router.push('/')
        }
      })
    }

    return { isAuthenticated, isProfilePage, logout }
  },
}
</script>
