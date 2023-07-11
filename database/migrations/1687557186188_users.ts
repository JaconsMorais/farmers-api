import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .uuid('uuid')
        .unique()
        .notNullable()
        .index()
        .defaultTo(this.db.knexRawQuery('uuid_generate_v4()'))

      table.string('remember_me_token').nullable()

      table.string('name', 100).notNullable()
      table.string('email', 50).notNullable().unique()
      table.string('password', 150).notNullable()

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
