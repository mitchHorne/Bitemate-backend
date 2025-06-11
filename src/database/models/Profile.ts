import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  UpdatedAt,
  Table,
} from "sequelize-typescript";

import User from "./User";

@Table({
  tableName: "profile",
  modelName: "Profile",
  timestamps: true,
  paranoid: true,
})
export default class Profile extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare username: string;

  @Column({ type: DataType.STRING })
  declare bio: string;

  @Column({ type: DataType.STRING })
  declare state: string;

  @Column({ type: DataType.STRING })
  declare country: string;

  @Column({ type: DataType.BOOLEAN })
  declare isEmailVerified: boolean;

  @Column({ type: DataType.UUID })
  declare profilePhoto: string;

  @Column({ type: DataType.UUID })
  declare subscriptionPagePhoto: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: String;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
