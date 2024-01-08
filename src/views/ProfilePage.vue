<template>
  <Layout>
    <div class="container mx-auto pt-8">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
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

<script setup>
import Layout from '@/components/LayoutView.vue'
import userUserCards from '@/services/useUserCards'
import { onMounted } from 'vue'

const { data, get, loading } = userUserCards()

onMounted(() => {
  get()
  console.log('data', data, loading)
})
</script>
