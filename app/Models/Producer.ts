import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, ModelQueryBuilderContract, beforeCreate, beforeFetch, beforeFind, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import ignoreDeleted from 'App/Hooks/ignoreDeleted'
import Farm from './Farm'
import User from './User'

export default class Producer extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ serializeAs: null })
  public id: number

  @column({ isPrimary: true })
  public uuid: string

  @column()
  public name: string

  @column()
  public documentId: number

  @column()
  public city: string

  @column()
  public state: string

  @column({ serializeAs: null, prepare: (value: string) => value.toLowerCase() })
  public userId: number

  @column.dateTime()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(producer: Producer) {
    producer.uuid = uuid()
  }

  @beforeFetch()
  public static fetchIgnoreDeleted(query: ModelQueryBuilderContract<typeof Producer>) {
    ignoreDeleted(query)
  }

  @beforeFind()
  public static findIgnoreDeleted(query: ModelQueryBuilderContract<typeof Producer>) {
    ignoreDeleted(query)
  }

  @hasMany(() => Farm)
  public farms: HasMany<typeof Farm>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
