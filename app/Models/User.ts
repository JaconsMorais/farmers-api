import { DateTime } from 'luxon'
import { BaseModel, ModelQueryBuilderContract, beforeFetch, beforeFind, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import ignoreDeleted from 'App/Hooks/ignoreDeleted'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ serializeAs: null })
  public id: number

  @column({ isPrimary: true })
  public uid: string

  @column()
  public rememberMeToken: string | null

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }


  @beforeFetch()
  public static fetchIgnoreDeleted(query: ModelQueryBuilderContract<typeof User>) {
    ignoreDeleted(query)
  }

  @beforeFind()
  public static findIgnoreDeleted(query: ModelQueryBuilderContract<typeof User>) {
    ignoreDeleted(query)
  }
}
