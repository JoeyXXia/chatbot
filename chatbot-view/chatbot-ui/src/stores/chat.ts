import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"
import { useUserStore } from "../stores/user"

interface ChatMessage {
  message: string
  reply: string
}

interface FormattedMessage {
  role: "user" | "ai"
  content: string
}

export const useChatStore = defineStore("chat", () => {
  const messages = ref<{ role: string; content: string }[]>([])
  const loading = ref(false)

  const userStore = useUserStore()

  //load previous chat message
  const loadChatHistory = async () => {
    if (!userStore.userId) return
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        { userId: userStore.userId }
      )

      messages.value = data.messages
        .flatMap((item: ChatMessage): FormattedMessage[] => [
          { role: "user", content: item.message },
          { role: "ai", content: item.reply },
        ])
        .filter((item: FormattedMessage) => item.content)
    } catch (error) {
      console.error("Error loading chat history:", error)
    }
  }

  //send message to ai
  const sendMessage = async (message: string) => {
    if (!message.trim() || !userStore.userId) return
    messages.value.push({ role: "user", content: message })

    loading.value = true

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        { userId: userStore.userId, message }
      )

      messages.value.push({ role: "ai", content: data.reply })
    } catch (error) {
      console.error("Error sending message:", error)
      messages.value.push({
        role: "ai",
        content: "Error: " + (error as any).message || "Unknown error",
      })
    } finally {
      loading.value = false
    }
  }

  return { messages, loading, loadChatHistory, sendMessage }
})
