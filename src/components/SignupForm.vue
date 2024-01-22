<template>
  <div class="container mx-auto py-8 text-gray-800">
    <div
      class="max-w-md mx-auto bg-gray-800 text-gray-300 rounded-lg overflow-hidden md:max-w-lg"
    >
      <div class="md:flex">
        <div class="w-full p-5">
          <div class="flex flex-col justify-center items-center">
            <img
              class="w-24 h-24 object-contain"
              src="https://img.pokemondb.net/sprites/scarlet-violet/normal/mew.png"
              alt="Mewtwo"
            />
            <h2 class="text-3xl text-gray-300 font-bold text-center">
              Sign up
            </h2>
          </div>

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
              <label class="block font-semibold text-gray-400 mb-1 text-sm"
                >Username:</label
              >
              <input
                type="text"
                name="username"
                v-model="username"
                placeholder="Type Username"
                class="border border-gray-700 p-2 rounded w-full bg-gray-500 placeholder:text-gray-700"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block font-semibold text-gray-400 mb-1 text-sm"
                >Email:</label
              >
              <input
                type="email"
                name="email"
                v-model="email"
                placeholder="Type an email address"
                class="border border-gray-700 p-2 rounded w-full bg-gray-500 placeholder:text-gray-600"
                required
                :disabled="loading"
                autocomplete="email"
              />
            </div>
            <div class="mb-4">
              <label class="block font-semibold text-gray-400 mb-1 text-sm"
                >Password:</label
              >
              <input
                type="password"
                name="password"
                v-model="password"
                placeholder="Type a password"
                class="border border-gray-700 p-2 rounded w-full bg-gray-500 placeholder:text-gray-600"
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
              class="w-full bg-pink-500 hover:bg-pink-600 text-gray-100 font-bold py-2 px-4 rounded transition duration-200 mt-8"
            >
              Sign Up
            </button>

            <div class="mt-6 text-center">
              <p>
                Already have an account?
                <router-link
                  to="/login"
                  class="text-pink-400 hover:text-pink-600"
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
