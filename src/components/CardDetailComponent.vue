<template>
  <div
    class="bg-gray-800 p-8 rounded-lg shadow-lg flex overflow-hidden max-w-4xl"
  >
    <!-- Left side with image -->
    <div class="hidden lg:block lg:w-1/2">
      <img
        :src="card.images.large"
        :alt="card.name"
        class="h-full w-full object-cover"
      />
    </div>

    <!-- Right side with content -->
    <div
      class="w-full lg:w-1/2 p-4 text-gray-100 flex flex-col justify-between"
    >
      <div>
        <div class="flex justify-between mb-4">
          <h2 class="text-3xl font-bold">{{ card.name }}</h2>
        </div>

        <div class="mb-4">
          <p class="font-medium">
            Supertype: <span class="font-normal">{{ card.supertype }}</span>
          </p>
          <p class="font-medium" v-if="card.subtypes">
            Subtype:
            <span class="font-normal">{{ card.subtypes.join(', ') }}</span>
          </p>
          <p class="font-medium">
            HP: <span class="font-normal">{{ card.hp }}</span>
          </p>
          <p class="font-medium" v-if="card.evolvesFrom">
            Evolves From:
            <span class="font-normal">{{ card.evolvesFrom }}</span>
          </p>
        </div>

        <div class="mb-4">
          <p class="font-medium">
            Artist: <span class="font-normal">{{ card.artist }}</span>
          </p>
          <p class="font-medium">
            Set: <span class="font-normal">{{ card.set.name }}</span>
          </p>
          <!-- <img
            :src="card.set.images.symbol"
            :alt="`${card.set.name} symbol`"
            class="h-12 w-12 object-cover"
          /> -->
          <img
            :src="card.set.images.logo"
            :alt="`${card.set.name} logo`"
            class="h-10 w-auto object-cover"
          />
          <p class="font-medium">
            Release Date:
            <span class="font-normal">{{ card.set.releaseDate }}</span>
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col justify-between gap-4 w-full mt-4">
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
  </div>
</template>

<script>
import userUserCards from '@/services/useUserCards'
import { useStore } from 'vuex'
import { computed } from 'vue'

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
    } = userUserCards()

    const isInCollection = computed(() =>
      store.state.cards.collection.some((item) => item === props.card.id),
    )
    const isInWishlist = computed(() =>
      store.state.cards.wishlist.some((item) => item === props.card.id),
    )

    return {
      addToCollection,
      removeFromCollection,
      addToWishlist,
      removeFromWishlist,
      isInCollection,
      isInWishlist,
    }
  },
}
</script>
