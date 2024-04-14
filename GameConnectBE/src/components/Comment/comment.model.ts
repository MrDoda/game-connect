import { Model, DataTypes } from 'sequelize'
import User from '../User/user.model'
import { Database } from '../../config/database'

class Comment extends Model {
  public id!: number
  public content!: string
  public ownerId!: number
  public created!: Date

  public static associate() {
    Comment.belongsTo(User, {
      foreignKey: 'ownerId',
      as: 'owner',
    })
  }
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
