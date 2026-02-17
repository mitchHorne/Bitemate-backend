import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "video",
  modelName: "Video",
  timestamps: true,
})
export default class Video extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare url: string;

  @CreatedAt
  declare craeted_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
