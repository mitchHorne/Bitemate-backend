import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import User from "./User";

@Table({
  tableName: "follow_request",
  modelName: "FollowRequest",
  timestamps: true,
})
export default class FollowRequest extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare senderId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare receiverId: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
