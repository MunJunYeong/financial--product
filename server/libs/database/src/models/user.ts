import { Model, Column, PrimaryKey, Table, Unique, DataType, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Product } from './product';

@Table({
  // default지만 명시
  timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  user_idx: number;

  @Column
  id: string;

  @Column
  pw: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  @Column
  otp_enabled: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  otp_verified: boolean;

  @Column
  otp_secret: string;

  @Column
  otp_auth_url: string;

  @HasMany(()=> Product)
  products: Product[];
}
