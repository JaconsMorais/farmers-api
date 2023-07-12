import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ModelQueryBuilderContract,
  afterCreate,
  beforeCreate,
  beforeFetch,
  beforeFind,
  beforeSave,
  belongsTo,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import ignoreDeleted from 'App/Hooks/ignoreDeleted'
import Farm from './Farm'
import User from './User'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Producer extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ serializeAs: null, isPrimary: true })
  public id: number

  @column({})
  public uuid: string

  @column()
  public name: string

  @column({})
  public documentId: number

  @column()
  public city: string

  @column()
  public state: string

  @column({
    serializeAs: null,
    prepare: (value: string) =>
      Number.isNaN(Number(value))
        ? Database.rawQuery(`(${User.query().where('uuid', value).select('id').toQuery()})`)
        : value,
  })
  public userId: any

  @column({
    columnName: 'farm_id',
    prepare: (value: string) => Number.isNaN(Number(value))
      ? Database.rawQuery(`(${Farm.query().where('uuid', value).select('id').toQuery()})`)
      : value
  })
  public farmId: any

  @column.dateTime({ columnName: 'deleted_at' })
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt: DateTime

  @beforeFetch()
  public static fetchIgnoreDeleted(query: ModelQueryBuilderContract<typeof Producer>) {
    ignoreDeleted(query)
  }

  @beforeFind()
  public static findIgnoreDeleted(query: ModelQueryBuilderContract<typeof Producer>) {
    ignoreDeleted(query)
  }

  @belongsTo(() => Farm,)
  public farm: BelongsTo<typeof Farm>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
