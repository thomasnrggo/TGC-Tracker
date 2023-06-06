/* eslint-disable no-unused-vars */
import { ref, reactive } from "vue";
import { searchCards as search } from "./pokemonTGC";

export default function usePokemonService() {
  const searchResults = reactive({
    data: [],
    page: 1,
    pageSize: 24,
    totalCount: 0,
  });
  const loading = ref(false);

  const searchCards = async (query, pageSize, page) => {
    loading.value = true;
    try {
      const results = await search(query, pageSize, page);
      searchResults.data = results.data;
      searchResults.page = results.page;
      searchResults.totalCount = results.totalCount;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    searchResults,
    searchCards,
    loading,
  };
}
