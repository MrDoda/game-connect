import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export class Database {
  private static instance: Sequelize | null = null
  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(
        process.env.DB_SCHEMA_NAME!,
        process.env.DB_USERNAME!,
        process.env.DB_PASS,
        {
          host: process.env.DB_HOSTNAME,
          dialect: 'mysql',
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      )
    }
    return Database.instance
  }

  public static async testConnection(): Promise<void> {
    try {
      await Database.getInstance().authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }
}
