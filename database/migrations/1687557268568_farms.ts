import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'farms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').unique().notNullable().index()

      table.string('name', 100).notNullable()
      table.decimal('area', 15, 2).notNullable()
      table.decimal('arableArea', 15, 2).notNullable()
      table.decimal('unusedArea', 15, 2).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('deletedAt').nullable()
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}