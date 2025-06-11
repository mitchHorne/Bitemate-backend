import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import Post from "./Post";
import User from "./User";

@Table({
  tableName: "post_comment",
  modelName: "PostComment",
  timestamps: true,
})
export default class PostComment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare comment: string;

  @ForeignKey(() => Post)
  @Column({ type: DataType.UUID })
  declare postId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
