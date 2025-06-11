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
  tableName: "follows",
  modelName: "Follows",
  timestamps: true,
})
export default class Follows extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare followerId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare followingId: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
