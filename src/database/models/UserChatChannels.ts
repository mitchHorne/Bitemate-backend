import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import ChatChannel from "./ChatChannel";
import User from "./User";

@Table({
  tableName: "user_chat_channel",
  modelName: "UserChatChannel",
  timestamps: true,
})
export default class UserChatChannel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @ForeignKey(() => ChatChannel)
  @Column({ type: DataType.UUID })
  declare chatChannelId: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
