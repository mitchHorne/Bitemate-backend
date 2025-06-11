import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import User from "./User";
import UserChatChannel from "./UserChatChannels";

@Table({
  tableName: "chat_channel",
  modelName: "ChatChannel",
  timestamps: true,
})
export default class ChatChannel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare name: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare ownerId: string;
  @BelongsTo(() => User)
  declare owner: User;

  @BelongsToMany(() => User, () => UserChatChannel)
  declare users: User[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
