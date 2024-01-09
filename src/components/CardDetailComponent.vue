<template>
  <div
    class="bg-gray-800 p-8 rounded-lg shadow-lg flex overflow-hidden max-w-3xl"
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
    <div class="w-full lg:w-1/2 p-4 text-white">
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
          Evolves From: <span class="font-normal">{{ card.evolvesFrom }}</span>
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

      <!-- Actions -->
      <div class="mt-4 flex justify-between gap-4 w-full">
        <button
          class="bg-primary-100 hover:bg-primary-200 text-white font-bold p-2 rounded transition duration-200 w-full"
          @click="addToCollection"
        >
          Add to Collection
        </button>
        <button
          class="bg-primary-100 hover:bg-primary-200 text-white font-bold p-2 rounded transition duration-200 w-full"
          @click="addToWishList"
        >
          Add to Wish List
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const addToCollection = () => {
      console.log('Add to collection')
    }

    const addToWishList = () => {
      console.log('Add to wish list')
    }

    return {
      addToCollection,
      addToWishList,
    }
  },
}
</script>
