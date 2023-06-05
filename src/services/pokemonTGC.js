import axios from "axios";

const api = axios.create({
  baseURL: "https://api.pokemontcg.io/v2",
  headers: {
    "x-api-key": "e415e94a-efa3-4e48-bae3-88160134c596",
  },
});

export const searchCards = async (query, pageSize = 20, page = 1) => {
  const response = await api.get("/cards", {
    params: {
      ...(query && {
        name: query,
      }),
      pageSize,
      page,
    },
  });
  console.log("response?.data", response?.data);
  return response?.data;
};
