import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, Index, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'projects',
  timestamps: true,
})
export class Project extends Model<
  InferAttributes<Project>,
  InferCreationAttributes<Project>
> {
  @Column({ type: DataType.STRING, allowNull: false })
  declare project_name: string;
  @Index
  @Column({ type: DataType.NUMBER, allowNull: false })
  declare manager_id: number;
  @Column({ type: DataType.NUMBER, allowNull: false })
  declare budgeted_hours: number;
  @Column({ type: DataType.NUMBER, allowNull: false })
  declare hourly_rate: number;
}
