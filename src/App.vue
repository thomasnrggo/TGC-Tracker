<template>
  <router-view />
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    onMounted(() => {
      if (store.state.token) {
        store.dispatch('checkTokenExpiration')
      }
    })
  },
}
</script>
