import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import Image from "./Image";
import Video from "./Video";

@Table({
  tableName: "cooking_lesson",
  modelName: "CookingLesson",
  timestamps: true,
})
export default class CookingLesson extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare title: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare photo: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare video: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare vegan_replacement_video: string;

  @Column({ type: DataType.STRING })
  declare difficulty: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_vegan_replacement: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
