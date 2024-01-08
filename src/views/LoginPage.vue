<template>
  <Layout>
    <div class="p-4">
      <button @click="currentView = 'signup'" class="mr-2">Signup</button>
      <button @click="currentView = 'login'">Login</button>

      <LoginForm />
    </div>
  </Layout>
</template>

<script setup>
import { ref } from "vue";
import Layout from "@/components/LayoutView.vue";
import LoginForm from "@/components/LoginForm.vue";

const currentView = ref("signup"); // 'signup' or 'login'
</script>
