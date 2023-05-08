import { Model, Column, PrimaryKey, Table, Unique, DataType, AutoIncrement, HasMany } from "sequelize-typescript";
import { InstallmentOption } from "./installmentOptions.entity";

@Table
export class Installment extends Model<Installment> {
    @PrimaryKey
    @Column(DataType.BIGINT)
    installment_idx: number

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

    @HasMany(() => InstallmentOption)
    options: InstallmentOption[];

}