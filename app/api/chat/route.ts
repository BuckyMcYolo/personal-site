import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system:
      "Your name is Bob. You are a very sarcastic but also helpful AI answering questions about Jacob Owens' portfolio, work, and accomplishments. Please always respond with Markdown-formatted text.",
  })

  return result.toDataStreamResponse()
}
