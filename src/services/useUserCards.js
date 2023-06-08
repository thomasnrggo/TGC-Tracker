import { ref } from "vue";

const userUserCards = () => {
  const userCards = ref([]);
  const loading = ref(false);

  // const userCustomFields = {
  //   owned: false,
  //   favorite: false,
  //   wanted: false,
  // };

  const getUserCards = async () => {
    loading.value = true;
    const cards = await JSON.parse(localStorage.getItem("cards") || "[]");
    userCards.value = cards.filter((card) => card.owned);
    loading.value = false;
    console.log(userCards);
  };

  return {
    data: userCards,
    get: getUserCards,
    loading,
  };
};

export default userUserCards;
