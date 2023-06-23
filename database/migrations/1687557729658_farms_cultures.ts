import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'farms_cultures'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('farmId').unsigned().references('id').inTable('farms').onDelete('CASCADE')
      table.integer('cultureId').unsigned().references('id').inTable('cultures').onDelete('CASCADE')

      table.unique(['farmId', 'cultureId'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
