import { Model, DataTypes } from 'sequelize'
import User from '../User/user.model'
import Page from '../Page/page.model'
import { Database } from '../../config/database'

class Post extends Model {
  public id!: number
  public title!: string
  public content!: string
  public ownerId!: number
  public pageId!: number
  public created!: Date
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    pageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Page',
        key: 'id',
      },
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: Database.getInstance(),
    tableName: 'Post',
    timestamps: false,
  }
)

export default Post
