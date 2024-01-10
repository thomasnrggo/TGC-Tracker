<template>
  <header class="bg-secondary-200 text-gray-100 w-full">
    <Header></Header>
  </header>
  <div class="bg-secondary-100 min-h-[calc(100vh-100px)] pb-12">
    <slot></slot>
  </div>
</template>

<script setup>
import Header from '@/components/HeaderComponent.vue'
</script>
