// app/Controllers/Http/ChatController.ts
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'
import axios from 'axios' // For AI integration

export default class ChatController {
  public async handleMessage({ request, response }: HttpContextContract) {
    const userMessage = request.input('message')
    
    // 1. Check CMS for predefined responses
    const contents = await Content.query()
      .where('keywords', 'LIKE', `%${userMessage}%`)
      .orWhere('title', 'LIKE', `%${userMessage}%`)
    
    if (contents.length > 0) {
      return response.json({ 
        source: 'cms',
        response: contents[0].text 
      })
    }
    
    // 2. Fall back to AI
    try {
      const aiResponse = await this.getAIResponse(userMessage)
      return response.json({
        source: 'ai',
        response: aiResponse
      })
    } catch (error) {
      return response.status(500).json({
        error: 'Failed to get AI response'
      })
    }
  }

  private async getAIResponse(message: string): Promise<string> {
    // Mock AI response - in real implementation, call OpenAI/HuggingFace
    return `I don't have a specific answer for "${message}", but I'm learning!`
    
    // Example with OpenAI:
    // const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    //   model: 'gpt-3.5-turbo',
    //   messages: [{ role: 'user', content: message }]
    // }, {
    //   headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` }
    // })
    // return response.data.choices[0].message.content
  }
}