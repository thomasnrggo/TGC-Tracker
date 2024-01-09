<template>
  <div class="container mx-auto py-8 text-gray-800">
    <div
      class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg"
    >
      <div class="md:flex">
        <div class="w-full p-5">
          <h2 class="text-4xl font-bold text-center">Signup</h2>

          <div
            v-if="errorMessage"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4"
            role="alert"
          >
            <strong class="font-bold mr-1">Error!</strong>
            <span class="block sm:inline">{{ errorMessage }}</span>
          </div>

          <form @submit.prevent="submitSignupForm" class="py-4">
            <div class="mb-4">
              <label class="block font-semibold">Username:</label>
              <input
                type="text"
                v-model="username"
                placeholder="Type Username"
                class="border-2 border-gray-200 p-2 rounded w-full"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block font-semibold">Email:</label>
              <input
                type="email"
                v-model="email"
                placeholder="Type an email address"
                class="border-2 border-gray-200 p-2 rounded w-full"
                required
                :disabled="loading"
                autocomplete="email"
              />
            </div>
            <div class="mb-4">
              <label class="block font-semibold">Password:</label>
              <input
                type="password"
                v-model="password"
                placeholder="Type a password"
                class="border-2 border-gray-200 p-2 rounded w-full"
                required
                :disabled="loading"
                autocomplete="current-password"
              />
            </div>

            <div v-if="loading">
              <LoaderComponent />
            </div>

            <button
              v-else
              type="submit"
              :disabled="loading"
              class="w-full bg-pink-500 hover:bg-primary-200 text-gray-100 font-bold py-2 px-4 rounded transition duration-200 mt-8"
            >
              Sign Up
            </button>

            <div class="mt-6 text-center">
              <p>
                Already have an account?
                <router-link
                  to="/login"
                  class="text-blue-500 hover:text-blue-700"
                  >Login</router-link
                >.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import LoaderComponent from '@/components/LoaderComponent.vue'

export default {
  components: {
    LoaderComponent,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const username = ref('')
    const email = ref('')
    const password = ref('')

    const loading = ref(false)
    const errorMessage = ref('')

    const submitSignupForm = async () => {
      loading.value = true
      errorMessage.value = ''
      try {
        await store
          .dispatch('register', {
            username: username.value,
            email: email.value,
            password: password.value,
          })
          .then(() => {
            router.push('/')
          })
      } catch (error) {
        console.log(error.response.data.message)
        errorMessage.value = error.response.data.message
      } finally {
        loading.value = false
      }
    }

    return {
      username,
      email,
      password,
      loading,
      errorMessage,
      submitSignupForm,
    }
  },
}
</script>
