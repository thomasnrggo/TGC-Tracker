<template>
  <router-view />
</template>

<script>
import axios from 'axios'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    onMounted(async () => {
      if (store.state.token) {
        store.dispatch('checkTokenExpiration')
      }
      await axios.get('https://tgc-tracker-api.onrender.com').finally(() => {
        console.debug('API is up and running')
      })
    })
  },
}
</script>
