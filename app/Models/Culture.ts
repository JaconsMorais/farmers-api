import { DateTime } from 'luxon'
import {
  BaseModel,
  ModelQueryBuilderContract,
  beforeFetch,
  beforeFind,
  column,
} from '@ioc:Adonis/Lucid/Orm'
import ignoreDeleted from 'App/Hooks/ignoreDeleted'

export default class Culture extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ columnName: 'deleted_at' })
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt: DateTime

  @beforeFetch()
  public static fetchIgnoreDeleted(query: ModelQueryBuilderContract<typeof Culture>) {
    ignoreDeleted(query)
  }

  @beforeFind()
  public static findIgnoreDeleted(query: ModelQueryBuilderContract<typeof Culture>) {
    ignoreDeleted(query)
  }
}
