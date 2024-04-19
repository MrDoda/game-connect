import OpenAI from 'openai'
import type Express from 'express'
import openaiTokenCounter from 'openai-gpt-token-counter'
import { prompts } from './openai.prompts'
import { normalizePrompts } from './openai.validation'
import Page from '../Page/page.model'
import Post from '../Post/post.model'

interface OpenAIRequest {
  content?: string
  title?: string
  prompt?: string
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const OpenAIService = {
  generatePageContent: async (
    req: Express.Request<undefined, OpenAIRequest>,
    res: Express.Response
  ) => {
    const { prompt, title, content } = req.body

    const [error, normalizedPrompt] = normalizePrompts(
      { title, sysPrompt: prompts.postPrompt, content, prompt },
      res
    )
    if (error || !normalizedPrompt) {
      return res.status(400).send(error)
    }

    const { systemPrompt, userPrompt, currentPromptLength } = normalizedPrompt

    try {
      const entities = await Page.findAll()
      const context = OpenAIService.createContext(entities, currentPromptLength)

      const response = await OpenAIService.promptOpenAI({
        systemPrompt,
        userPrompt,
        context,
      })

      console.log(response.choices[0].message.content)
      return res.send({
        content: response.choices[0].message.content,
      })
    } catch {
      return res.status(502).send({
        message:
          'Error generating page content. Try again & maybe change prompt / content.',
      })
    }
  },

  generatePostContent: async (
    req: Express.Request<undefined, OpenAIRequest>,
    res: Express.Response
  ) => {
    const { prompt, title, content } = req.body

    const [error, normalizedPrompt] = normalizePrompts(
      { title, sysPrompt: prompts.postPrompt, content, prompt },
      res
    )
    if (error || !normalizedPrompt) {
      return res.status(400).send(error)
    }

    const { systemPrompt, userPrompt, currentPromptLength } = normalizedPrompt

    try {
      const entities = await Post.findAll()
      const context = OpenAIService.createContext(entities, currentPromptLength)

      const response = await OpenAIService.promptOpenAI({
        systemPrompt,
        userPrompt,
        context,
      })

      console.log(response.choices[0].message.content)
      return res.send({
        content: response.choices[0].message.content,
      })
    } catch {
      return res.status(502).send({
        message:
          'Error generating page content. Try again & maybe change prompt / content.',
      })
    }
  },

  promptOpenAI: async ({
    systemPrompt,
    userPrompt,
    context,
  }: {
    systemPrompt: string
    userPrompt: string
    context: string
  }) =>
    await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `${systemPrompt}${context}`,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),

  createContext: <T>(
    entities: Array<{ content: string }>,
    currentPromptLength: number
  ): string => {
    let currentContext = ''
    let previousContext = currentContext
    for (const entity of entities) {
      currentContext += `Another Page: ${entity.content}`

      if (
        openaiTokenCounter.text(currentContext, 'gpt-4') + currentPromptLength >
        2500
      ) {
        return previousContext
      }
      previousContext = currentContext
    }

    return currentContext
  },
}
