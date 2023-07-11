import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'farms_cultures'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('farm_id').unsigned().references('id').inTable('farms').onDelete('CASCADE')
      table
        .integer('culture_id')
        .unsigned()
        .references('id')
        .inTable('cultures')
        .onDelete('CASCADE')

      table.unique(['farm_id', 'culture_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
