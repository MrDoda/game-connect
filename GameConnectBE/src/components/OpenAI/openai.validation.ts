import openaiTokenCounter from 'openai-gpt-token-counter'
import type Express from 'express'
import { prompts } from './openai.prompts'
import { ErrorType } from '../../types/common.types'

export const isPromptLengthOk = (systemPrompt: string, userPrompt: string) => {
  const messages = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: userPrompt,
    },
  ]

  if (openaiTokenCounter.chat(messages, 'gpt-4') > 2500) {
    return false
  }

  return openaiTokenCounter.chat(messages, 'gpt-4')
}

export const normalizePrompts = (
  {
    title,
    sysPrompt,
    content,
    prompt,
  }: {
    title?: string
    sysPrompt: string
    content?: string
    prompt?: string
  },
  res: Express.Response
): [
  ErrorType | null,
  {
    systemPrompt: string
    userPrompt: string
    currentPromptLength: number
  } | null,
] => {
  if (!prompt) {
    return [{ message: 'Prompt is required' }, null]
  }
  const userPrompt = `Current Generated Website: ${content} \n\n ${title}\n\n${prompt}\n`
  const systemPrompt = `${sysPrompt}`

  const currentPromptLength = isPromptLengthOk(systemPrompt, userPrompt)

  if (!currentPromptLength) {
    return [
      {
        message: 'Prompt / Content is too long. Please shorten it.',
      },
      null,
    ]
  }

  return [null, { systemPrompt, userPrompt, currentPromptLength }]
}
