import { Model, DataTypes } from 'sequelize'
import { Database } from '../../config/database'
import { isStringValidation } from '../../utils/isStringValidation'

class MenuItem extends Model {
  public id!: number
  public pageId!: number | null
  public ownerId!: number
  public customUrl!: string | null
  public name!: string
  public menuLocation!: string
  public orderNumber!: number
  public created!: Date
}

MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    pageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Page',
        key: 'id',
      },
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    customUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: [0, 255],
        isString: (value: any) => {
          if (!value) return true
          if (typeof value !== 'string')
            throw new Error(
              'Validation failed given property must be a string!'
            )
        },
        isUrlPath: (value: any) => {
          if (!value) return true
          if (!/^\/[A-Za-z0-9\-_\/]*$/.test(value))
            throw new Error(
              'URL path is invalid. Only alphanumeric characters, hyphens, underscores, and slashes are allowed.'
            )
        },
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [0, 255],
        isString: isStringValidation,
      },
    },
    menuLocation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [0, 255],
        isString: isStringValidation,
      },
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [0, 255],
      },
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: Database.getInstance(),
    tableName: 'MenuItem',
    timestamps: false,
  }
)

export default MenuItem
