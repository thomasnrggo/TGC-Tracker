/* eslint-disable no-unused-vars */
import { ref, reactive } from 'vue'
import { getCards } from './useService'

export default function usePokemonCards() {
  const searchResults = reactive({
    data: [],
    page: 1,
    pageSize: 24,
    totalCount: 0,
  })
  const loading = ref(false)

  const searchCards = async (query, pageSize, page) => {
    loading.value = true
    try {
      const results = await getCards(query, pageSize, page)
      searchResults.data = results.data
      searchResults.page = results.page
      searchResults.totalCount = results.totalCount
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    data: searchResults,
    get: searchCards,
    loading,
  }
}
