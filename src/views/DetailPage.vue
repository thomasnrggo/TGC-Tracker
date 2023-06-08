<template>
  <Layout>
    <div
      v-if="loading"
      class="text-white font-semibold flex flex-col items-center justify-center"
    >
      <Loading />
      <h2>Loading card details...</h2>
    </div>

    <div v-else class="container mx-auto py-8 text-white">
      <button
        @click="$router.go(-1)"
        class="text-white text-xs py-4 hover:text-primary-100 translate ease"
      >
        Go back
      </button>
      <div class="grid grid-cols-3 gap-8">
        <div class="col-span-1">
          <img
            class="col-span-1 w-full"
            :src="data?.images?.large"
            :alt="data.name"
          />
        </div>
        <div class="col-span-2">
          <h1 class="text-3xl font-semibold">{{ data.name }}</h1>
          <span class="text-sm block">by {{ data.artist }}</span>

          <button
            class="block p-2 bg-primary-100 mb-2"
            @click="save('favorite')"
          >
            {{ favorite ? "Remove from favorites" : "Add to favorites" }}
          </button>
          <button class="block p-2 bg-primary-100 mb-2" @click="save('owned')">
            {{ owned ? "Remove from collection" : "Add to collection" }}
          </button>
          <button class="block p-2 bg-primary-100 mb-2" @click="save('wanted')">
            {{ wanted ? "Remove to wish list" : "Add to wish list" }}
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Layout from "@/components/LayoutView.vue";
import usePokemonCardDetail from "@/services/usePokemonCardDetail";
import Loading from "@/components/LoaderComponent.vue";

const route = useRoute();
const { get, data, loading } = usePokemonCardDetail();

const owned = ref(false);
const favorite = ref(false);
const wanted = ref(false);

onMounted(() => {
  get(route.params.id);
  owned.value = data.value.owned;
  favorite.value = data.value.favorite;
  wanted.value = data.value.wanted;
});

const save = (operation) => {
  get(route.params.id);
  const savedCards = JSON.parse(localStorage.getItem("cards") || "[]");

  const itemToUpdate = savedCards.findIndex(
    (card) => card.id === data.value.id
  );

  console.log("operation", operation);

  switch (operation) {
    case "favorite":
      savedCards[itemToUpdate].favorite = !data.value.favorite;
      favorite.value = savedCards[itemToUpdate].favorite;
      localStorage.setItem("cards", JSON.stringify(savedCards));
      break;
    case "owned":
      savedCards[itemToUpdate].owned = !data.value.owned;
      owned.value = savedCards[itemToUpdate].owned;
      localStorage.setItem("cards", JSON.stringify(savedCards));
      break;
    case "wanted":
      savedCards[itemToUpdate].wanted = !data.value.wanted;
      wanted.value = savedCards[itemToUpdate].wanted;
      localStorage.setItem("cards", JSON.stringify(savedCards));
      break;
    default:
      break;
  }
};

console.log(route.params.id);
</script>
