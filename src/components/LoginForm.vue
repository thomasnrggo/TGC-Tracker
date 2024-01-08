<template>
  <div class="container mx-auto py-8 text-white">
    <h2 class="text-xl mb-4">Login</h2>
    <form @submit.prevent="submitLoginForm">
      <div class="mb-4">
        <label class="block">Email:</label>
        <input
          type="email"
          v-model="email"
          class="border p-2 rounded w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block">Password:</label>
        <input
          type="password"
          v-model="password"
          class="border p-2 rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    submitLoginForm() {
      // Handle the login logic here
      console.log('Login with:', this.email, this.password)
    },
  },
}
</script>
