import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ModelQueryBuilderContract,
  beforeFetch,
  beforeFind,
  beforeSave,
  belongsTo,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import ignoreDeleted from 'App/Hooks/ignoreDeleted'
import findForeignKey from 'App/Hooks/findForeignKey'
import Farm from './Farm'
import User from './User'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Producer extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ serializeAs: null })
  public id: number

  @column({ isPrimary: true })
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

  @beforeSave()
  public static foreignKeys(query: ModelQueryBuilderContract<typeof Producer>): void {
    findForeignKey(query)
  }

  @hasMany(() => Farm, {
    foreignKey: 'producerId',
  })
  public farms: HasMany<typeof Farm>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
