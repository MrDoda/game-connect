import { Sequelize } from 'sequelize'

export class Database {
  private static instance: Sequelize | null = null
  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(
        process.env.DB_NAME!,
        process.env.DB_USER!,
        process.env.DB_PASS,
        {
          host: process.env.DB_HOST,
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
}
