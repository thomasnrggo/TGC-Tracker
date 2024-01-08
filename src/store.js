import { createStore } from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
  },
  actions: {
    register({ commit }, authData) {
      return axios
        .post('https://tgc-tracker-api.onrender.com/api/v1/auth/signup', {
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
        .post('https://tgc-tracker-api.onrender.com/api/v1/auth/login', {
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
    logout({ commit }) {
      commit('setUser', null)
      commit('setToken', null)
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
