import { Model, DataTypes } from 'sequelize'
import User from '../User/user.model'
import Page from '../Page/page.model'
import { Database } from '../../config/database'

class MenuItem extends Model {
  public id!: number
  public pageId!: number | null // This can be null if not linked to a Page
  public ownerId!: number
  public customUrl!: string | null // This can be null
  public name!: string
  public menuLocation!: string
  public orderNumber!: number
  public created!: Date

  public static associate() {
    MenuItem.belongsTo(User, {
      foreignKey: 'ownerId',
      as: 'owner',
    })

    MenuItem.belongsTo(Page, {
      foreignKey: 'pageId',
      as: 'page',
    })
  }
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
