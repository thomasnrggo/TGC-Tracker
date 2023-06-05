/* eslint-disable no-unused-vars */
import { ref } from "vue";
import { searchCards as search } from "./pokemonTGC";

export default function usePokemonService() {
  const searchResults = ref([]);

  const searchCards = async (query) => {
    try {
      const cards = await search(query);
      console.log("cards", cards);
      searchResults.value = cards?.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    searchResults,
    searchCards,
  };
}
