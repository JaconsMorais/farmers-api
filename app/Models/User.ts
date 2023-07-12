import { DateTime } from 'luxon'
import {
  BaseModel,
  HasMany,
  ModelQueryBuilderContract,
  beforeFetch,
  beforeFind,
  beforeSave,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import ignoreDeleted from 'App/Hooks/ignoreDeleted'
import Producer from './Producer'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ serializeAs: null, isPrimary: true, columnName: 'id' })
  public id: number

  @column({ columnName: 'uuid' })
  public uuid: string

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

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
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

  @hasMany(() => Producer)
  public producers: HasMany<typeof Producer>
}
