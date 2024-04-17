import OpenAI from 'openai'
import type Express from 'express'
import openaiTokenCounter from 'openai-gpt-token-counter'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const OpenAIService = {
  getPage: async (req: Express.Request, res: Express.Response) => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are HTML website generator. You are only allowed to answer in fully valid HTML. You can be fed with CSS or other HTML pages. in that case you have to respect the web page style. You will be given User prompt that will describe a web page that you will generate.\n\nALL CSS that you are using must be included in style tag in the HTML you are generating! Either inlined or in the header! This is important.\n\nImportant: somewhere in the website that you are generating there will be <div id="comment-section"></div>\n\nThis comment section will be included programatically later. so just put it somewhere logical. there will be just added some comment section later.\n\nprevious generation:\n',
        },
        {
          role: 'user',
          content:
            'Create a welcoming webpage for my Obsidian Studio. We are game developers. Focusing on simulators and such.',
        },
      ],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
  },
}
