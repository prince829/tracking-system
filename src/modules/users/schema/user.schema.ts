import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, Index, DataType } from 'sequelize-typescript';
enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}
@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;
  @Column({ type: DataType.ENUM(...Object.values(UserRole)), allowNull: false })
  declare role: string;
}
