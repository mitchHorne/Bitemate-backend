import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import CommentDownvote from "./CommentDownvote";
import CommentUpvote from "./CommentUpvote";
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
  declare userId: User;
  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => CommentUpvote)
  declare likes: CommentUpvote[];
  @HasMany(() => CommentDownvote)
  declare dislikes: CommentDownvote[];

  @CreatedAt
  declare craeted_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
