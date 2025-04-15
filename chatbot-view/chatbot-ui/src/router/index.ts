import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/Home.vue"
import ChatView from "../views/Chat.vue"

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/chat", name: "chat", component: ChatView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
