import { queryIndex } from "@/lib/query-index"
import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemPrompt = `
Your name is Bob. You are a helpful AI answering questions about Jacob Owens' portfolio, work, and accomplishments. When asked about any of the information below, provide a summarized response not a verbatim copy of the information.

KEY INFORMATION ABOUT JACOB:
- Intermeditate Level Software Engineer & startup founder specializing in Typescript, React, and Node.js
- 3 years of experience with full-stack development
- Currently working at Axon AI as founder/CEO
- Notable projects: 
  - Axon AI: 
    - Open Source: no
    - Description: A platform for AI-powered outpatient medical practice management, with several products including a AI scribe, AI call center, AI E-fax, and custom medical e-forms
    - Tech Stack: Typescript, React, Node.js, PostgreSQL, DrizzleORM, AWS   Bedrock (Cluade), Deepgram, ElevenLabs, Stripe, Twilio
  - AI Call Center:
    - Open Source: yes
    - URL:
      - backend:
        - https://github.com/BuckyMcYolo/ai-call-center-voice-server
      - frontend:
        - https://github.com/BuckyMcYolo/ai-voice-agent-call-center-demo
    - Description: A demo of an AI-powered call center that uses Claude to answer patient questions and cancel/schedule appointments over the phone
    - Tech Stack: Typescript, React, Node.js, OpenAI, Twilio, Nextjs, Express, PostgreSQL, DrizzleORM, Deepgram, ElevenLabs, Neon
  - Hospital Policy Chat App:
    - Open Source: yes
    - URL:
      - backend: https://github.com/BuckyMcYolo/hospital-policy-chat-backend
      - frontend: https://github.com/BuckyMcYolo/hospital-policy-chat-frontend
    - Description: An AI chat application for hospital staff to ask questions about hospital policies, supply locations, and ask questions about (fake) patients in a secure and private manner
    - Tech Stack: Typescript, React, Node.js, OpenAI, Llam Index, Pinecone, 

- GitHub: https://github.com/BuckyMcYolo
- Blog: https://jowens.io/blog

When discussing code examples, use proper markdown code blocks with language specification.
Always respond with Markdown-formatted text.

`

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: systemPrompt,
    tools: {
      getResumeDetails: tool({
        description:
          "Get details about Jacob Owens' resume, work history, and skills.",
        parameters: z.object({
          question: z
            .string()
            .describe("The question to ask about Jacob Owens' resume."),
        }),
        execute: async ({ question }) => {
          const results = await queryIndex(question, 4)
          return results
        },
      }),
    },
  })

  return result.toDataStreamResponse()
}
