import { createStore } from 'vuex'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export default createStore({
  state: {
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    token: sessionStorage.getItem('token') || null,
    cards: JSON.parse(sessionStorage.getItem('cards')) || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    setToken(state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    setCards(state, cards) {
      state.cards = cards
      sessionStorage.setItem('cards', JSON.stringify(cards))
    },
  },
  actions: {
    register({ commit }, authData) {
      return axios
        .post('https://tgc-tracker-api.vercel.app/api/v1/auth/signup', {
          username: authData.username,
          email: authData.email,
          password: authData.password,
        })
        .then((response) => {
          commit('setUser', response.data.user)
          commit('setToken', response.data.token)
        })
        .catch((error) => {
          throw error
        })
    },
    login({ commit }, authData) {
      return axios
        .post('https://tgc-tracker-api.vercel.app/api/v1/auth/login', {
          email: authData.email,
          password: authData.password,
        })
        .then((response) => {
          commit('setUser', response.data.user)
          commit('setToken', response.data.token)
        })
        .then(() => {
          this.dispatch('updateUserCards')
        })
        .catch((error) => {
          throw error
        })
    },
    logout({ commit }) {
      commit('setUser', null)
      commit('setToken', null)
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    },
    checkTokenExpiration({ state, dispatch }) {
      const token = state.token
      if (token) {
        const decoded = jwtDecode(token)
        if (decoded.exp < Date.now() / 1000) {
          dispatch('logout')
        }
      }
    },
    updateUserCards({ commit }) {
      const token = this.state.token
      const id = this.state.user._id

      axios
        .get(`https://tgc-tracker-api.vercel.app/api/v1/cards/${id}/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          commit('setCards', response.data)
        })
        .catch((error) => {
          throw error
        })
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
    user(state) {
      return state.user
    },
  },
})
