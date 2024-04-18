import { Model, DataTypes } from 'sequelize'
import { Database } from '../../config/database'

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
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    menuLocation: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
