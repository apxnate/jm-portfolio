import { streamText } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { SYSTEM_PROMPT } from '@/lib/prompt'

export const maxDuration = 30

function getModel() {
  if (process.env.GROQ_API_KEY) {
    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })
    return groq('llama-3.3-70b-versatile')
  }
  if (process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })
    return openai('gpt-4o-mini')
  }
  throw new Error('No AI provider key found. Set GROQ_API_KEY or OPENAI_API_KEY in .env.local')
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: getModel(),
      system: SYSTEM_PROMPT,
      messages,
      maxTokens: 900,
      temperature: 0.75,
    })

    return result.toDataStreamResponse()
  } catch (err) {
    console.error('[/api/chat] Error:', err)
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
