import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true
  @column()
  public id: number

  @column({ isPrimary: true })
  public uuid: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column.dateTime()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(user: User) {
    user.uuid = uuid()
  }

  @beforeCreate()
  public static async hashPassword(user: User) {
    user.password = await Hash.make(user.password)
  }
}
