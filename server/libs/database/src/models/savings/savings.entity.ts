import { Model, Column, PrimaryKey, Table, Unique, DataType, AutoIncrement } from "sequelize-typescript";

@Table
export class Savings extends Model<Savings> {

    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    savings_idx!: number

    @Column
    dcls_month: string

    @Column
    fin_co_no: string

    @Unique
    @Column
    fin_prdt_cd: string

    @Column
    kor_co_nm: string

    @Column
    fin_prdt_nm: string

    @Column
    max_limit: number

}