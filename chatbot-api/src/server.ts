import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { StreamChat } from "stream-chat"
import OpenAI from "openai"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//initialize Stream Chat client
const chatClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
)

//initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Register user with Stream Chat
app.post("/register", async (req: Request, res: Response): Promise<any> => {
  const { username, email } = req.body
  if (!username || !email) {
    res.status(400).json({ error: "Username is required" })
  }

  try {
    const userId = email.replace(/[^a-zA-Z0-9_-]/g, "_")

    // check if user already exists
    const userResponse = await chatClient.queryUsers({ id: { $eq: userId } })
    if (!userResponse.users.length) {
      // create user if not exists
      await chatClient.upsertUser({
        id: userId,
        name: username,
        email: email,
        role: "user",
      })
    }

    res.status(200).json({ userId, username, email })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})
// Send a message to ai
app.post("/chat", async (req: Request, res: Response): Promise<any> => {
  const { userId, message } = req.body
  if (!userId || !message) {
    res.status(400).json({ error: "User ID and message are required" })
  }

  try {
    //verify user exists
    const userResponse = await chatClient.queryUsers({ id: userId })
    if (!userResponse.users.length) {
      return res.status(400).json({ error: "User not found" })
    }
    // Send message to OpenAI
    console.log("Sending message to OpenAI:", message)

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    })

    console.log("OpenAI response:", response)

    res.send("success")
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
