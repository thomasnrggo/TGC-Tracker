<template>
  <Layout>
    <div class="container mx-auto pt-8">
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
          class="text-white font-semibold flex flex-col items-center justify-center mt-40"
        >
          <Loading />
          <h2>Getting cards...</h2>
        </div>

        <div v-else>
          <EmptyState v-if="data?.data.length <= 0"></EmptyState>
          <div v-else>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <!-- TODO: make reusable card -->
              <div
                v-for="card in data?.data"
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
            <div class="flex justify-center py-8">
              <vue-awesome-paginate
                :total-items="data.totalCount"
                :items-per-page="data.pageSize"
                :max-pages-shown="5"
                v-model="data.page"
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
  </Layout>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import Loading from "@/components/LoaderComponent.vue";
import Layout from "@/components/LayoutView.vue";
import usePokemonCards from "@/services/usePokemonCards";
import EmptyState from "@/components/EmptyState.vue";

const { data, get, loading } = usePokemonCards();

const state = reactive({
  query: "",
  pageSize: 24,
});

onMounted(() => {
  get(state.query);
});

const search = () => {
  get(state.query);
};

const handlePagination = (page) => {
  get(state.query, state.pageSize, page);
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
</style>
