import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ChannelUsers extends BaseSchema {
  protected tableName = 'channel_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE')
      table.integer('channel_id').unsigned().notNullable()
      .references('id').inTable('channels').onDelete('CASCADE')
      //table.string("status", 255).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['user_id', 'channel_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
