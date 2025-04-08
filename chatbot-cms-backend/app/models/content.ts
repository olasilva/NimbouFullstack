// app/Models/Content.ts
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Content extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public text: string

  @column()
  public keywords: string
}