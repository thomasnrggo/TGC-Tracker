import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.pokemontcg.io/v2/',
  headers: {
    'x-api-key': process.env.API_KEY,
  },
})

export const getCards = async (query, page = 1, pageSize = 12) => {
  // TODO: how can make search better
  const response = await api.get('cards', {
    params: {
      ...(query && {
        q: `name:${query}`,
      }),
      pageSize,
      page,
    },
  })
  return response?.data
}

export const getCard = async (id) => {
  const response = await api.get(`cards/${id}`)
  return response?.data
}
