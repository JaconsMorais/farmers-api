import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Producer extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column()
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
}
