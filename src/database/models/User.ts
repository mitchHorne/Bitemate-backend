import {
  BelongsToMany,
  Column,
  CreatedAt,
  HasMany,
  DataType,
  Model,
  Table,
  UpdatedAt,
  HasOne,
} from "sequelize-typescript";

import FollowRequest from "./FollowRequest";
import Follows from "./Follows";

import Post from "./Post";
import CommentDownvote from "./CommentDownvote";
import CommentUpvote from "./CommentUpvote";
import DownvotePost from "./Downvote";
import FlagPost from "./FlagPost";
import PostComment from "./PostComment";
import PostReport from "./PostReport";
import SavedPost from "./SavedPost";
import TaggedPost from "./TaggedPost";
import UpvotePost from "./Upvote";

import Profile from "./Profile";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
export default class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isSuperuser: Boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isStaff: Boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: Boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: "active",
  })
  declare activationKey: string;

  @Column({
    type: DataType.STRING,
    defaultValue: "otp",
  })
  declare otp: string;

  @HasOne(() => Profile)
  declare profile: Profile;
  @HasOne(() => PrivacyPolicy)
  declare privacyPolicy: PrivacyPolicy;
  @HasOne(() => TermsAndConditions)
  declare termsAndConditions: TermsAndConditions;

  @HasMany(() => Post, "authorId")
  declare posts: Post[];

  @HasMany(() => DownvotePost)
  declare downVotes: DownvotePost[];
  @HasMany(() => FlagPost)
  declare flags: FlagPost[];
  @HasMany(() => PostComment)
  declare comments: PostComment[];
  @HasMany(() => CommentDownvote)
  declare likes: CommentDownvote[];
  @HasMany(() => CommentUpvote)
  declare dislikes: CommentUpvote[];
  @HasMany(() => PostReport)
  declare reports: PostReport[];
  @HasMany(() => TaggedPost)
  declare taggedPosts: TaggedPost[];
  @HasMany(() => UpvotePost)
  declare upVotes: UpvotePost[];

  @BelongsToMany(() => Post, () => SavedPost)
  declare savedPosts: SavedPost[];

  @HasMany(() => FollowRequest, "senderId")
  declare followRequestsSent: FollowRequest[];
  @HasMany(() => FollowRequest, "receiverId")
  declare followRequestsReceived: FollowRequest[];

  @HasMany(() => Follows, "followerId")
  declare following: Follows[];
  @HasMany(() => Follows, "followingId")
  declare followers: Follows[];

  @CreatedAt
  declare craeted_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
