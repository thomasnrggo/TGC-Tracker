<template>
  <!-- Left side with image -->
  <div class="block w-full lg:block lg:w-1/2 relative">
    <img
      v-show="imageLoaded"
      :src="card.images.large"
      :alt="card.name"
      class="h-full w-full object-contain"
      @load="handleImageLoad"
    />
    <div
      v-show="!imageLoaded"
      class="h-full w-full flex justify-center items-center"
    >
      <img
        src="@/assets/placeholder.jpg"
        alt="Pokemon card"
        class="h-full w-full object-contain"
      />
    </div>
  </div>

  <!-- Right side with content -->
  <div class="w-full lg:w-1/2 p-4 text-gray-100 flex flex-col justify-between">
    <div>
      <div class="mb-4">
        <div class="flex justify-between text-base text-gray-400">
          <h4>{{ card.supertype }}</h4>
          <h4>{{ card.subtypes.join(', ') }}</h4>
        </div>
        <h2 class="text-3xl font-bold">{{ card.name }}</h2>
        <h3 class="text-gray-400 text-lg">{{ card.rarity }}</h3>
      </div>

      <div v-if="card.evolvesFrom" class="mb-4 flex flex-col">
        <h6 class="text-xs m-0 font-bold text-gray-500">Evolves From:</h6>
        <p class="text-gray-400">{{ card.evolvesFrom }}</p>
      </div>

      <!-- Set information -->
      <div class="my-4">
        <h4 class="text-lg font-semibold text-gray-200">Set information</h4>
        <div class="flex justify-between items-center">
          <div class="text-gray-400">
            <h6 class="text-xs m-0 font-bold text-gray-500">Name:</h6>
            <p>{{ card.set.name }}</p>
            <h6 class="text-xs m-0 font-bold text-gray-500">Series:</h6>
            <p>{{ card.set.series }}</p>
          </div>
          <img
            :src="card.set.images.logo"
            :alt="`${card.set.name} logo`"
            class="h-12 w-auto max-w-[50%] object-contain"
          />
        </div>
      </div>

      <!-- Card market prices -->
      <div class="my-4">
        <div class="flex justify-between items-center">
          <h4 class="text-lg font-semibold mb-2 text-gray-200">
            Card Market Prices
          </h4>
          <a :href="card.cardmarket.url" target="_blank">
            <font-awesome-icon
              :icon="['fas', 'arrow-up-right-from-square']"
              class="text-gray-500 hover:text-pink-300"
            />
          </a>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-700 p-3 rounded">
            <p class="font-medium text-gray-400">Average Sell Price:</p>
            <p class="font-bold text-gray-200">
              {{ card.cardmarket.prices.averageSellPrice }}€
            </p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="font-medium text-gray-400">Low Price:</p>
            <p class="font-bold text-gray-200">
              {{ card.cardmarket.prices.lowPrice }}€
            </p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="font-medium text-gray-400">Reverse Holo Trend:</p>
            <p class="font-bold text-gray-200">
              {{ card.cardmarket.prices.reverseHoloTrend }}€
            </p>
          </div>
          <div class="bg-gray-700 p-3 rounded">
            <p class="font-medium text-gray-400">Trend Price:</p>
            <p class="font-bold text-gray-200">
              {{ card.cardmarket.prices.trendPrice }}€
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="isAuthenticated">
      <LoaderComponent v-if="loading" />
      <div v-else class="flex flex-col justify-between gap-4 w-full mt-4">
        <button
          v-if="isInCollection"
          class="bg-gray-900 hover:bg-red-500 text-gray-600 hover:text-gray-100 font-bold p-2 rounded transition duration-200 w-full"
          @click="removeFromCollection(card)"
        >
          Remove from Collection
        </button>
        <button
          v-else
          class="bg-pink-500 hover:bg-pink-500 text-gray-100 font-bold p-2 rounded transition duration-200 w-full"
          @click="addToCollection(card)"
        >
          Add to Collection
        </button>

        <button
          v-if="isInWishlist && !isInCollection"
          class="bg-pink-500 hover:bg-primary-200 text-gray-100 font-bold p-2 rounded transition duration-200 w-full"
          @click="addToWishlist(card)"
        >
          Remove from Wish List
        </button>
        <button
          v-else-if="!isInWishlist && !isInCollection"
          class="border border-gray-600 hover:border-pink-500 hover:bg-pink-500 text-gray-600 hover:text-gray-100 font-bold p-2 rounded transition duration-200 w-full"
          @click="addToWishlist(card)"
        >
          Add to Wish List
        </button>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-400 text-center">
        Want to track your Pokemon TGC collection?<br />
        <router-link to="/login" class="text-pink-400 hover:text-pink-600"
          >Log in</router-link
        >
        now and start adding cards!
      </p>
    </div>
  </div>
</template>

<script>
import userUserCards from '@/services/useUserCards'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import LoaderComponent from './LoaderComponent.vue'

export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const {
      addToCollection,
      removeFromCollection,
      addToWishlist,
      removeFromWishlist,
      loading,
    } = userUserCards()
    const imageLoaded = ref(false)
    const handleImageLoad = () => {
      setTimeout(() => {
        imageLoaded.value = true
      }, 300)
    }
    const isInCollection = computed(() =>
      store.state.cards.collection.some((item) => item === props.card.id),
    )
    const isInWishlist = computed(() =>
      store.state.cards.wishlist.some((item) => item === props.card.id),
    )
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    return {
      imageLoaded,
      handleImageLoad,
      addToCollection,
      removeFromCollection,
      addToWishlist,
      removeFromWishlist,
      isInCollection,
      isInWishlist,
      isAuthenticated,
      loading,
    }
  },
  components: {
    LoaderComponent,
  },
}
</script>
