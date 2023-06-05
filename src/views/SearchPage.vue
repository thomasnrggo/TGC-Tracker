<template>
  <div class="bg-secondary-200 min-h-screen py-8">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <div class="container mx-auto">
      <h1 class="text-3xl font-semibold mb-4 text-white">
        Pokemon TCG Tracker
      </h1>
      <!-- Add your search bar and card list placeholder here -->
      <div>
        <form
          class="grid grid-cols-5 gap-8 w-full mb-8"
          @submit.prevent="search"
        >
          <input
            type="text"
            v-model="state.query"
            placeholder="Search for cards"
            class="col-span-4 w-full p-4"
          />
          <button @click="search" class="col-span-1 bg-primary-100 p-4">
            Search
          </button>
        </form>

        <div v-show="loading" class="text-[white]"><h2>Loading</h2></div>

        <div v-show="!loading" class="grid grid-cols-5 gap-8">
          <img
            v-for="card in searchResults"
            :key="card.id"
            :src="card?.images?.small"
            :alt="card.name"
            class="col-span-1 w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import usePokemonService from "@/services/usePokemonService";

const { searchResults, searchCards } = usePokemonService();

const loading = ref(true);
const state = reactive({
  query: "",
});

onMounted(() => {
  searchCards(state.query);
  loading.value = false;
});

const search = () => {
  loading.value = true;
  searchCards(state.query);
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};
</script>
