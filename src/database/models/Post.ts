import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import User from "./User";

import DownvotePost from "./Downvote";
import FlagPost from "./FlagPost";
import PostComment from "./PostComment";
import PostReport from "./PostReport";
import SavedPost from "./SavedPost";
import TaggedPost from "./TaggedPost";
import UpvotePost from "./Upvote";

@Table({
  tableName: "post",
  modelName: "Post",
  timestamps: true,
})
export default class Post extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare foodName: string;

  @Column({ type: DataType.STRING })
  declare foodNameNative: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ type: DataType.STRING })
  declare difficulty: string;

  @Column({ type: DataType.STRING })
  declare recipeSource: string;

  @Column({ type: DataType.STRING })
  declare suitedOccasion: string;

  @Column({ type: DataType.BOOLEAN })
  declare isTraditional: boolean;

  @Column({ type: DataType.BOOLEAN })
  declare isActive: boolean;

  @Column({ type: DataType.STRING })
  declare country: string;

  @Column({ type: DataType.INTEGER })
  declare downVote: number;

  @Column({ type: DataType.INTEGER })
  declare upVote: number;

  @Column({ type: DataType.INTEGER })
  declare timeToCook: number;

  @Column({ type: DataType.BOOLEAN })
  declare isFlagged: boolean;

  @Column({ type: DataType.STRING })
  declare note: string;

  @Column({ type: DataType.BOOLEAN })
  declare isRecipe: boolean;

  @Column({ type: DataType.TEXT("medium") })
  declare ingredients: string;

  @Column({ type: DataType.TEXT("medium") })
  declare instructions: string;

  @Column({ type: DataType.STRING })
  declare servingSize: string;

  @Column({ type: DataType.STRING })
  declare imageUrl: string;

  @Column({ type: DataType.UUID })
  declare videoUrl: string;

  @BelongsTo(() => User, "authorId")
  declare author: User;
  @HasMany(() => DownvotePost)
  declare dislikes: DownvotePost[];
  @HasMany(() => FlagPost)
  declare flags: FlagPost[];
  @HasMany(() => PostComment)
  declare comments: PostComment[];
  @HasMany(() => PostReport)
  declare reports: PostReport[];
  @HasMany(() => SavedPost)
  declare savedPosts: SavedPost[];
  @HasMany(() => TaggedPost)
  declare taggedPosts: TaggedPost[];
  @HasMany(() => UpvotePost)
  declare likes: UpvotePost[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
