import {
  Model,
  Column,
  PrimaryKey,
  Table,
  DataType,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user';

@Table
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  product_idx: number;

  @Column
  name: string;

  @Column
  start_date: string;

  @Column
  finish_date: string;

  @Column
  period: number;

  @Column
  rate: number;

  @Column
  monthly_payment: number;

  // 총 이자
  @Column
  total_interest: number;

  // savings(정기적금), deposit(정기예금)
  @Column
  type: string;

  @Column
  is_simple: boolean;

  @ForeignKey(() => User)
  @Column
  user_idx: number;

  @BelongsTo(() => User)
  user: User;
}
