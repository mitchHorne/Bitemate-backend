import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "message",
  modelName: "Message",
  timestamps: true,
})
export default class Message extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare text: string;

  @Column({ type: DataType.BIGINT })
  declare timeToken: bigint;

  @Column({ type: DataType.STRING, allowNull: true })
  declare file: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare fileType: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
