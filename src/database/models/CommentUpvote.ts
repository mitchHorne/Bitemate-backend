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

@Table({
  tableName: "comment_upvote",
  modelName: "CommentUpvote",
  timestamps: true,
})
export default class CommentUpvote extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => PostComment)
  @Column({ type: DataType.UUID })
  declare postCommentId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
