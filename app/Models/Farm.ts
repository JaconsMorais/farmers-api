import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeFetch,
  beforeFind,
  column,
  HasOne,
  hasOne,
  manyToMany,
  ManyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import Culture from './Culture'
import { v4 as uuid } from 'uuid'
import ignoreDeleted from 'App/Hooks/ignoreDeleted'
import Database from '@ioc:Adonis/Lucid/Database'
import Producer from './Producer'

export default class Farm extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ serializeAs: null, isPrimary: true })
  public id: number

  @column({})
  public uuid: string

  @column()
  public name: string

  @column()
  public area: number

  @column()
  public arableArea: number

  @column()
  public unusedArea: number

  @column({
    prepare: (value: string) =>
      Number.isNaN(Number(value))
        ? Database.rawQuery(`(${Culture.query().where('uuid', value).toQuery()})`)
        : value,
  })
  public cultureId: number

  @column.dateTime()
  public deleted_at: DateTime

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updated_at: DateTime

  @manyToMany(() => Culture, {
    pivotTable: 'farms_cultures',
    pivotForeignKey: 'farm_id',
    pivotRelatedForeignKey: 'culture_id',
  })
  public cultures: ManyToMany<typeof Culture>

  @hasOne(() => Producer)
  public producer: HasOne<typeof Producer>

  @beforeCreate()
  public static assignUuid(farm: Farm) {
    farm.uuid = uuid()
  }

  @beforeFetch()
  public static fetchIgnoreDeleted(query: ModelQueryBuilderContract<typeof Farm>) {
    ignoreDeleted(query)
  }

  @beforeFind()
  public static findIgnoreDeleted(query: ModelQueryBuilderContract<typeof Farm>) {
    ignoreDeleted(query)
  }
}
