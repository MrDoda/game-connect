import { Model, DataTypes } from 'sequelize'
import User from '../User/user.model'
import { Database } from '../../config/database'

class Page extends Model {
  public id!: number
  public content!: string
  public title!: string
  public url!: string
  public ownerId!: number
  public created!: Date
}

Page.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
      validate: {
        len: [0, 4294967295],
        isString: (value: any) => {
          if (typeof value === 'string') throw new Error('URL must be a string')
        },
      },
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [0, 255],
        isString: (value: any) => {
          if (typeof value === 'string') throw new Error('URL must be a string')
        },
      },
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 255],
        isString: (value: any) => {
          if (typeof value === 'string') throw new Error('URL must be a string')
        },
        isUrlPath: (value: any) => {
          if (!/^\/[A-Za-z0-9\-_\/]*$/.test(value))
            throw new Error(
              'URL path is invalid. Only alphanumeric characters, hyphens, underscores, and slashes are allowed.'
            )
        },
      },
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Owner ID must be provided' },
      },
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: Database.getInstance(),
    tableName: 'Page',
    timestamps: false,
  }
)

export default Page
