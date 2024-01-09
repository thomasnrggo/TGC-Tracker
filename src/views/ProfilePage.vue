<template>
  <Layout>
    <div class="container mx-auto pt-8">
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <h2 class="text-4xl font-bold text-center text-gray-800 capitalize">
            {{ username }} Collection
          </h2>
          <button
            v-if="data.length !== 0"
            @click="triggerSearch"
            class="bg-pink-500 hover:bg-primary-200 text-gray-100 font-bold py-2 px-4 rounded transition duration-200"
          >
            Search
          </button>
        </div>
        <div v-if="isSearchActive" class="search-bar mt-8">
          <input
            type="text"
            placeholder="Search cards..."
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <LoaderComponent v-if="loading" />

      <div
        v-if="!loading && data.length === 0"
        class="text-center flex flex-col justify-center items-center min-h-[60vh]"
      >
        <h3 class="text-3xl text-gray-800 font-semibold mb-4">
          Your collection is empty
        </h3>
        <p class="text-lg text-gray-500 mb-6">
          Start building your collection by finding and adding cards.
        </p>
        <router-link
          to="/"
          class="text-gray-500 hover:text-primary-100 font-bold rounded border border-gray-500 hover:border-primary-100 p-2 transition duration-200 inline-block"
        >
          Browse Cards
        </router-link>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <!-- TODO: make reusable card -->
        <div
          v-for="card in data"
          :key="card.id"
          class="w-full hover:scale-[1.01] transition-all ease-in cursor-pointer"
        >
          <!-- <router-link :to="`/card/${card.id}`"> -->
          <img
            class="col-span-1 w-full"
            :src="card?.images?.small"
            :alt="card.name"
          />
          <!-- </router-link> -->
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Layout from '@/components/LayoutView.vue'
import userUserCards from '@/services/useUserCards'
import LoaderComponent from '@/components/LoaderComponent.vue'

export default {
  setup() {
    const store = useStore()
    const username = store.state.user.username

    const isSearchActive = ref(false)

    const { data, get, loading } = userUserCards()

    onMounted(async () => {
      await store.dispatch('checkTokenExpiration')
      await get()
    })

    const triggerSearch = () => {
      isSearchActive.value = !isSearchActive.value
    }

    return {
      data,
      loading,
      username,
      isSearchActive,
      triggerSearch,
    }
  },
  components: {
    Layout,
    LoaderComponent,
  },
}
</script>
