<template>
  <div
    class="py-4 px-6 bg-gray-800 shadow-md flex justify-between items-center"
  >
    <img :src="robotImage" alt="chat ai" class="w-8 h-8" />
    <h1 class="text-lg font-semibold">Chat AI</h1>
    <button @click="logout" class="text-gray-400 hover:text-white">
      logout
    </button>
  </div>
</template>

<script setup lang="ts">
import robotImage from "../assets/robot.png"
import { useUserStore } from "../stores/user"
import { useRouter } from "vue-router"

const userStore = useUserStore()
const router = useRouter()
const logout = () => {
  userStore.logout()
  router.push("/")
}
</script>

<style lang="less" scoped></style>
