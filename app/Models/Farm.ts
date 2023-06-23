import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Culture from './Culture'
import { v4 as uuid } from 'uuid'

export default class Farm extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column()
  public id: number

  @column({ isPrimary: true })
  public uuid: string

  @column()
  public name: string

  @column()
  public area: number

  @column()
  public arableArea: number

  @column()
  public unusedArea: number

  @column()
  public cultureId: number

  @column.dateTime()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  public updatedAt: DateTime

  @manyToMany(() => Culture, {
    pivotTable: 'farms_cultures',
    pivotForeignKey: 'farmId',
    pivotRelatedForeignKey: 'cultureId',
  })
  public cultures: ManyToMany<typeof Culture>

  @beforeCreate()
  public static assignUuid(farm: Farm) {
    farm.uuid = uuid()
  }
}
