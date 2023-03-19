import { Model } from "sequelize";
import { Column, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table
export class Savings extends Model<Savings> {
    @Column
    @PrimaryKey
    savings_idx: number

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