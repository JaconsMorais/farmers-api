import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      table.uuid('uid').unique().notNullable().index().defaultTo(this.db.knexRawQuery('uuid_generate_v4()'))

      table.string('remember_me_token').nullable()

      table.string('name', 100).notNullable()
      table.string('email', 50).notNullable().unique()
      table.string('password', 60).notNullable()

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
