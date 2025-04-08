// app/Controllers/Http/ContentController.ts
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'

export default class ContentController {
  public async index({ response }: HttpContextContract) {
    const contents = await Content.all()
    return response.json(contents)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['title', 'text', 'keywords'])
    const content = await Content.create(data)
    return response.status(201).json(content)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const content = await Content.findOrFail(params.id)
    const data = request.only(['title', 'text', 'keywords'])
    content.merge(data)
    await content.save()
    return response.json(content)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const content = await Content.findOrFail(params.id)
    await content.delete()
    return response.noContent()
  }
}