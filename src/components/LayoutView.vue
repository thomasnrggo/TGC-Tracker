<template>
  <header class="bg-secondary-200 text-white w-full py-8">
    <Header></Header>
  </header>
  <div class="bg-secondary-100 min-h-[100vh]">
    <slot></slot>
  </div>
</template>

<script setup>
import Header from "@/components/HeaderComponent.vue";
</script>
