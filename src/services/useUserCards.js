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

  const addCardToCollection = async (card) => {
    loading.value = true
    try {
      const token = store.state.token
      const id = store.state.user._id

      await axios
        .post(`https://tgc-tracker-api.onrender.com/api/v1/cards/${id}`, card, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async () => {
          await store.dispatch('updateUserCards')
          loading.value = false
        })
    } catch (err) {
      console.error(err)
      error.value = err
      loading.value = false
    }
  }

  const addCardToWishlist = async (card) => {
    loading.value = true
    try {
      const token = store.state.token
      const id = store.state.user._id

      await axios
        .post(
          `https://tgc-tracker-api.onrender.com/api/v1/cards/${id}/wishlist`,
          card,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(async () => {
          await store.dispatch('updateUserCards')
          loading.value = false
        })
    } catch (err) {
      console.error(err)
      error.value = err
    }
  }

  const removeCardFromCollection = async (card) => {
    loading.value = true
    try {
      const token = store.state.token
      const id = store.state.user._id

      await axios
        .delete(
          `https://tgc-tracker-api.onrender.com/api/v1/cards/${id}/${card.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(async () => {
          await store.dispatch('updateUserCards')
          loading.value = false
        })
    } catch (err) {
      console.error(err)
      error.value = err
    }
  }

  const removeCardFromWishlist = async (card) => {
    loading.value = true
    try {
      const token = store.state.token
      const id = store.state.user._id

      await axios
        .delete(
          `https://tgc-tracker-api.onrender.com/api/v1/cards/${id}/wishlist/${card._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(async () => {
          await store.dispatch('updateUserCards')
          loading.value = false
        })
    } catch (err) {
      console.error(err)
      error.value = err
    }
  }

  return {
    data: userCards,
    get: getUserCards,
    loading,
    error,
    addToCollection: addCardToCollection,
    removeFromCollection: removeCardFromCollection,
    addToWishlist: addCardToWishlist,
    removeFromWishlist: removeCardFromWishlist,
  }
}

export default useUserCards
