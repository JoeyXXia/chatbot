<template>
  <div class="flex flex-col h-screen bg-gray-900 text-white">
    <Header />
    <div id="chat-container" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="(message, index) in chatStore.messages"
        :key="index"
        class="flex-1 item-start"
        :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-xs p-3 rounded-lg"
          :class="
            message.role === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300'
          "
        >
          <p class="text-sm">{{ message.content }}</p>
        </div>
      </div>
      <div v-if="chatStore.loading" class="flex justify-start">
        <div class="bg-gray-700 text-white px-4 rounded-l-2xl">
          <span class="animate-pulse"> AI is thinking... </span>
        </div>
      </div>
    </div>
    <div class="p-4 bg-gray-800 flex">
      <ChatInput @send="chatStore.sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue"
import ChatInput from "../components/ChatInput.vue"

import { onMounted, nextTick } from "vue"
import { useUserStore } from "../stores/user"
import { useChatStore } from "../stores/chat"
import { useRouter } from "vue-router"

const userStore = useUserStore()
const chatStore = useChatStore()
const router = useRouter()

// ensure user login
if (!userStore.userId) {
  router.push("/")
}

//auto scroll to bottom
const scrollToBottom = () => {
  nextTick(() => {
    const chatContainer = document.getElementById("chat-container")
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  })
}

onMounted(() => {
  chatStore.loadChatHistory().then(() => {
    scrollToBottom()
  })
})
</script>

<style lang="less" scoped></style>
