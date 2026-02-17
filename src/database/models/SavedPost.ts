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
  tableName: "saved_post",
  modelName: "SavedPost",
  timestamps: true,
})
export default class SavedPost extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare text: string;

  @Column({ type: DataType.STRING })
  declare categoryName: string;

  @ForeignKey(() => Post)
  @Column({ type: DataType.UUID })
  declare postId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @CreatedAt
  declare craeted_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
