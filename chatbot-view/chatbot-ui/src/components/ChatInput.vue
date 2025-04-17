<template>
  <div class="p-4 bg-gray-800 flex">
    <input
      type="text"
      class="flex-1 p-2 rounded-l bg-gray-700 text-white"
      v-model="message"
      placeholder="Type your message..."
      @keyup.enter="sendMessage"
    />
    <button class="bg-blue-500 text-white p-2 rounded-r" @click="sendMessage">
      Send
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const message = ref("")
const emit = defineEmits(["send"])

const sendMessage = () => {
  if (message.value.trim()) {
    emit("send", message.value)
    message.value = ""
  }
}
</script>

<style lang="less" scoped></style>
