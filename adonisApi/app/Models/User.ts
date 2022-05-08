import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, manyToMany, ManyToMany, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Channel from './Channel'
import Message from './Message'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public nickName: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Channel, {
    pivotTable: 'channels_users',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'channel_id',
    pivotTimestamps: true,
  })
  public channels: ManyToMany<typeof Channel>

  @manyToMany(() => Channel, {
    pivotTable: 'invites',
    pivotForeignKey: 'to_user_id',
    pivotRelatedForeignKey: 'channel_id',
    pivotTimestamps: true,
  })
  public invites: ManyToMany<typeof Channel>

  @manyToMany(() => User, {
    pivotTable: 'kicks',
    pivotForeignKey: 'to_user_id',
    pivotRelatedForeignKey: 'channel_id',
    pivotTimestamps: true,
  })
  public kicks: ManyToMany<typeof User>

  @hasMany(() => Channel, {
    foreignKey: 'ownerId',
  })
  public ownedChannels: HasMany<typeof Channel>

  @hasMany(() => Message, {
    foreignKey: 'userId',
  })
  public messages: HasMany<typeof Message>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
