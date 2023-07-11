import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'setup_extensions'

  public async up() {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  }

  public async down() {
    await this.db.rawQuery('DROP EXTENSION IF EXISTS "uuid-ossp";')
  }
}
