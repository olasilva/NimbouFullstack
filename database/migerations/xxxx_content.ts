// database/migrations/xxxx_content.ts
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Content extends BaseSchema {
  protected tableName = 'contents'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.text('text').notNullable()
      table.string('keywords') // for matching user queries
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}