<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
  >
    <div
      class="bg-gray-800 rounded-lg shadow-lg flex overflow-hidden max-w-4xl relative"
    >
      <button
        @click="closeModal"
        class="absolute top-0 right-0 mx-4 my-2 text-white hover:text-gray-300"
      >
        <span class="text-xl">&times;</span>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:show'],
  methods: {
    closeModal() {
      this.$emit('update:show', false)
    },
  },
}
</script>
