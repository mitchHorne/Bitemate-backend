import {
  BelongsTo,
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
  tableName: "chat_message",
  modelName: "ChatMessage",
  timestamps: true,
})
export default class ChatMessage extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare text: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare file: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare fileType: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare posterId: string;
  @BelongsTo(() => User)
  declare poster: User;

  @ForeignKey(() => ChatChannel)
  @Column({ type: DataType.UUID })
  declare channelId: string;
  @BelongsTo(() => ChatChannel)
  declare channel: ChatChannel;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
