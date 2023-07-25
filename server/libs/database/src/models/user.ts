import { Model, Column, PrimaryKey, Table, Unique, DataType, AutoIncrement } from 'sequelize-typescript';


@Table({
  // default지만 명시
  timestamps: true 
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
}
