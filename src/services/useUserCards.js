import { ref } from 'vue'
import axios from 'axios'
import store from '../store'

const useUserCards = () => {
  const userCards = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getUserCards = async () => {
    loading.value = true
    error.value = null

    try {
      const token = store.state.token
      const id = store.state.user._id

      const response = await axios.get(
        `https://tgc-tracker-api.onrender.com/api/v1/cards/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      userCards.value = response.data
    } catch (err) {
      console.error(err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    data: userCards,
    get: getUserCards,
    loading,
    error,
  }
}

export default useUserCards
