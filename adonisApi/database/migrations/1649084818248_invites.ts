import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Invites extends BaseSchema {
  protected tableName = 'invites'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('from_user_id').unsigned()
      .references('id').inTable('users').onDelete('CASCADE')
      table.integer('to_user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE')
      table.integer('channel_id').unsigned().notNullable()
      .references('id').inTable('channels').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
