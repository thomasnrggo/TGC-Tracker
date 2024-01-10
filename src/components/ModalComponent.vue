<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
  >
    <div
      class="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl mx-auto relative"
      :class="{ 'max-w-xs': isSmallScreen, 'max-w-3xl': isMediumScreen }"
    >
      <button
        @click="closeModal"
        class="absolute top-0 right-0 mx-4 my-2 text-gray-100 hover:text-pink-500"
      >
        <span class="text-2xl">&times;</span>
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
  computed: {
    isSmallScreen() {
      return window.innerWidth < 640
    },
    isMediumScreen() {
      return window.innerWidth >= 640 && window.innerWidth < 768
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    closeModal() {
      this.$emit('update:show', false)
    },
    handleResize() {
      this.$forceUpdate()
    },
  },
}
</script>
