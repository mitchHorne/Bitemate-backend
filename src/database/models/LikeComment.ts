import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Model,
  ForeignKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import PostComment from "./PostComment";
import User from "./User";
import Post from "./Post";

@Table({
  tableName: "like_comment",
  modelName: "LikeComment",
  timestamps: true,
})
export default class LikeComment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => PostComment)
  @Column({ type: DataType.UUID })
  declare postCommentId: string;
  @BelongsTo(() => PostComment)
  declare postComment: PostComment;

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
