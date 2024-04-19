import { Router } from 'express'
import { OpenAIService } from './openai.service'

export const openAiRouter = Router()

openAiRouter.post('/generate/page/content', OpenAIService.generatePageContent)
openAiRouter.post('/generate/post/content', OpenAIService.generatePostContent)
