<template>
  <Layout>
    <div
      v-if="loading"
      class="text-gray-100 font-semibold flex flex-col items-center justify-center"
    >
      <Loading />
      <h2>Loading card details...</h2>
    </div>

    <div v-else class="container mx-auto text-gray-100">
      <button
        @click="$router.go(-1)"
        class="text-gray-100 text-xs py-4 hover:text-pink-300 translate ease"
      >
        <font-awesome-icon icon="arrow-left" class="mr-2 text-lg" />
        <span class="text-lg">Go back</span>
      </button>
      <div
        class="bg-gray-800 rounded-lg rounded-l-3xl rounder-t-3xl shadow-lg flex flex-col lg:flex-row w-full"
      >
        <CardDetailComponent v-if="data && data.name" :card="data" />
      </div>
    </div>
  </Layout>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '@/components/LayoutView.vue'
import usePokemonCardDetail from '@/services/usePokemonCardDetail'
import Loading from '@/components/LoaderComponent.vue'
import CardDetailComponent from '@/components/CardDetailComponent.vue'

export default {
  setup() {
    const route = useRoute()
    const id = route.params.id

    const { get, data, loading } = usePokemonCardDetail()

    onMounted(() => {
      get(id)
    })

    return {
      data,
      loading,
    }
  },
  components: {
    Layout,
    Loading,
    CardDetailComponent,
  },
}
</script>
