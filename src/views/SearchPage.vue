<template>
  <div class="bg-secondary-100 min-h-screen">
    <header class="bg-secondary-200 text-white w-full py-8">
      <div class="container flex justify-between w-full mx-auto">
        <h1 class="text-3xl font-semibold mb-4 text-white">
          Pokemon TCG Tracker
        </h1>
        <!-- <nav class="">
          <router-link to="/">Home</router-link> |
          <router-link to="/profile">Profile</router-link>
        </nav> -->
      </div>
    </header>
    <div class="container mx-auto mt-8">
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
            class="col-span-4 w-full p-2 rounded-sm"
          />
          <button
            @click="search"
            class="col-span-1 bg-primary-100 hover:bg-primary-200 transition ease rounded-sm text-white p-2 font-semibold"
          >
            Search
          </button>
        </form>

        <!-- TODO: make reusable loading -->
        <div
          v-if="loading"
          class="text-white font-semibold flex flex-col items-center justify-center"
        >
          <Loading />
          <h2>Loading cards...</h2>
        </div>

        <div v-else>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <!-- TODO: make reusable card -->
            <div
              v-for="card in searchResults?.data"
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
          <div class="flex justify-center py-8">
            <vue-awesome-paginate
              :total-items="searchResults.totalCount"
              :items-per-page="searchResults.pageSize"
              :max-pages-shown="5"
              v-model="searchResults.page"
              :on-click="handlePagination"
              paginate-buttons-class="w-10 h-10 bg-secondary-200 hover:bg-primary-100 cursor-pointer text-white text-xs font-semibold transition ease rounded-xl"
              active-page-class="!bg-primary-100"
              back-button-class="!bg-secondary-300 hover:!bg-primary-200"
              next-button-class="!bg-secondary-300 hover:!bg-primary-200"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import usePokemonService from "@/services/usePokemonService";
import Loading from "@/components/LoaderComponent.vue";

const { searchResults, searchCards, loading } = usePokemonService();

const state = reactive({
  query: "",
  pageSize: 24,
});

onMounted(() => {
  searchCards(state.query);
});

const search = () => {
  searchCards(state.query);
};

const handlePagination = (page) => {
  searchCards(state.query, state.pageSize, page);
};
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
</style>
