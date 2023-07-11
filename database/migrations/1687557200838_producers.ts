import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'producers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .uuid('uuid')
        .unique()
        .notNullable()
        .index()
        .defaultTo(this.db.knexRawQuery('uuid_generate_v4()'))

      table.string('document_id', 18).notNullable().index()
      table.string('name', 100).notNullable()
      table.string('city', 50)
      table.string('state', 2)

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('deleted_at').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
