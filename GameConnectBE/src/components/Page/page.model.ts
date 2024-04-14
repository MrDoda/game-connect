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

  public static associate() {
    Page.belongsTo(User, {
      foreignKey: 'ownerId',
      as: 'owner',
    })
  }
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
        notEmpty: { msg: 'Content must not be empty' },
      },
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title must not be empty' },
      },
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'URL must not be empty' },
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

Page.associate()

export default Page
