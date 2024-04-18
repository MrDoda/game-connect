import { Model, DataTypes } from 'sequelize'
import { Database } from '../../config/database'

class User extends Model {
  public id!: number
  public name!: string
  public email!: string
  public password!: string
  public role!: string | null
  public created!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [0, 255],
        isString: (value: any) => {
          if (typeof value === 'string') throw new Error('URL must be a string')
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 255],
        isString: (value: any) => {
          if (typeof value === 'string') throw new Error('URL must be a string')
        },
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [0, 255],
        isString: (value: any) => {
          if (typeof value === 'string') throw new Error('URL must be a string')
        },
      },
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: [0, 255],
        isString: (value: any) => {
          if (typeof value === 'string') throw new Error('URL must be a string')
        },
      },
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  },
  {
    sequelize: Database.getInstance(),
    tableName: 'User',
    timestamps: false,
  }
)

export default User
