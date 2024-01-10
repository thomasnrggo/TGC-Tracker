<template>
  <div
    class="text-center flex flex-col justify-center items-center min-h-[60vh]"
  >
    <img class="w-32 h-auto object-contain" :src="image" alt="Psyduck" />
    <h3 class="text-3xl text-gray-800 font-semibold mb-4">{{ title }}</h3>
    <p class="text-lg text-gray-500 mb-6">{{ message }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
}
</script>
