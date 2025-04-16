<template>
  <div class="h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="p-8 bg-gray rounded-lg shadow-lg w-full max-w-md">
      <img
        :src="rootImage"
        alt="Root Image"
        class="w-32 h-32 mx-auto mb-4 rounded-full shadow-lg"
      />
      <h1 class="text-2xl font-semibold mb-4 text-center">
        Welcome to the Chat App
      </h1>
      <input
        type="text"
        class="w-full p-2 mb-2 bg-gray-700 text-white roulded-lg focus:outline-none"
        placeholder="name"
        v-model="name"
      />
      <input
        type="email"
        class="w-full p-2 mb-2 bg-gray-700 text-white rounded-lg focus:outline-none"
        placeholder="email"
        v-model="email"
      />
      <button
        @click="createUser"
        class="w-full p-2 bg-blue-500 rounded-lg mb-2"
      >
        {{ loading ? "Loading..." : "Create User" }}
      </button>
      <button class="w-full p-2 bg-blue-500 rounded-lg">
        {{ loading ? "Loading..." : "Start Chat" }}
      </button>
      <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import rootImage from "../assets/robot.png"
import { ref } from "vue"
import { useUserStore } from "../stores/user"
import { useRouter } from "vue-router"
import axios from "axios"

const name = ref("")
const email = ref("")
const loading = ref(false)
const error = ref("")

const userStore = useUserStore()
const router = useRouter()

const createUser = async () => {
  if (!name.value || !email.value) {
    error.value = "Please fill in all fields."
    return
  }
  loading.value = true
  error.value = ""

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/register`,
      {
        name: name.value,
        email: email.value,
      }
    )
    userStore.setUser(data)

    router.push("/chat")
  } catch (err) {
    error.value = "Failed to create user. Please try again."
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped></style>
