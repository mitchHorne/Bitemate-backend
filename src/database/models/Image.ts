import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "image",
  modelName: "Image",
  timestamps: true,
})
export default class Image extends Model {
  @Column({ primaryKey: true, type: DataType.STRING })
  declare id: string;

  @Column({ primaryKey: true, type: DataType.STRING })
  declare url: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
