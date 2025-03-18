import { openai } from "@ai-sdk/openai"
import { embed, embedMany, generateObject, generateText } from "ai"
import fs from "fs"
import { z } from "zod"
import { Index } from "@upstash/vector"

type Metadata = {
  title: string
  content: string
  keywords: string[]
  source: string
}

const index = new Index<Metadata>({
  url: process.env.UPSTASH_VECTOR_ENDPOINT!,
  token: process.env.UPSTASH_VECTOR_TOKEN!,
})

export async function queryIndex(query: string, topK = 3) {
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: query,
  })

  const vectorStore = await index.query({
    vector: embedding,
    topK: topK,
    includeData: true,
    includeMetadata: true,
  })

  const formattedResults = vectorStore.map((item) => ({
    content: item?.metadata?.content || "",
    source: item?.metadata?.source || "",
    title: item?.metadata?.title || "",
  }))

  return formattedResults
}
