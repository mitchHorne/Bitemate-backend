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
  tableName: "privacy_policy",
  modelName: "PrivacyPolicy",
  timestamps: true,
})
export default class PrivacyPolicy extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare body: string;

  @Column({ type: DataType.BOOLEAN })
  declare isActive: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare authorId: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
