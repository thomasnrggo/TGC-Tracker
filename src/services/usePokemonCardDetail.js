import { ref } from "vue";
import { getCard } from "./pokemonTGC";

const usePokemonCardDetail = () => {
  const pokemon = ref({});
  const loading = ref(false);

  const userCustomFields = {
    owned: false,
    favorite: false,
    wanted: false,
  };

  const getCardById = async (id) => {
    loading.value = true;
    const cards = JSON.parse(localStorage.getItem("cards") || "[]");
    const card = cards.filter((card) => card.id === id)[0];
    if (card && card.id) {
      pokemon.value = card;
      loading.value = false;
    } else {
      try {
        const results = await getCard(id);
        pokemon.value = results.data;
        cards.push({ ...results.data, ...userCustomFields });
        localStorage.setItem("cards", JSON.stringify(cards));
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    }
  };

  return {
    data: pokemon,
    get: getCardById,
    loading,
  };
};

export default usePokemonCardDetail;
