<template>
  <Layout>
    <div class="container mx-auto pt-8">
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold text-center text-gray-200 capitalize">
            My Collection
          </h2>
          <button
            v-show="false"
            v-if="data.length !== 0"
            @click="triggerSearch"
            class="bg-pink-500 hover:bg-primary-200 text-gray-100 font-bold py-2 px-4 rounded transition duration-200"
          >
            Search
          </button>
        </div>
        <hr class="border-gray-500 my-4" />
        <div v-if="isSearchActive" class="search-bar mt-8">
          <input
            type="text"
            placeholder="Search cards..."
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <LoaderComponent v-if="loading" />

      <EmptyState
        v-if="!loading && data.length === 0"
        image="https://img.pokemondb.net/sprites/scarlet-violet/normal/snorlax.png"
        altText="Snorlax"
        title="Your collection is empty"
        message="There's no cards in your collection, Try adding some"
      >
        <router-link
          to="/"
          class="text-gray-500 hover:text-primary-100 font-bold rounded border border-gray-500 hover:border-primary-100 p-2 transition duration-200 inline-block"
        >
          Browse Cards
        </router-link>
      </EmptyState>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <!-- TODO: make reusable card -->
        <div
          v-for="card in data"
          :key="card.id"
          class="w-full hover:scale-[1.01] transition-all ease-in cursor-pointer"
        >
          <router-link :to="`/card/${card.id}`">
            <img
              class="col-span-1 w-full"
              :src="card?.images?.small"
              :alt="card.name"
            />
          </router-link>
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
import EmptyState from '@/components/EmptyState.vue'

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
    EmptyState,
  },
}
</script>
