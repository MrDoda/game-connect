import { Model, DataTypes } from 'sequelize'
import { Database } from '../../config/database'

class Comment extends Model {
  public id!: number
  public content!: string
  public postId!: number
  public ownerId!: number
  public created!: Date
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Post',
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
    tableName: 'Comment',
    timestamps: false,
  }
)

export default Comment
