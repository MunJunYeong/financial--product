import { Model, DataType, Column, PrimaryKey, Table, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Installment } from "./installments.entity";

@Table
export class InstallmentOption extends Model<InstallmentOption> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    option_idx: number

    @Column
    fin_prdt_cd: string

    @Column
    intr_rate_type_nm: string

    @Column
    rsrv_type_nm: string

    @Column
    save_trm: string

    @Column({
        type: DataType.FLOAT,
    })
    intr_rate: string

    @Column({
        type: DataType.FLOAT,
    })
    intr_rate2: string

    @ForeignKey(() => Installment)
    @Column
    installment_idx: number;

    @BelongsTo(() => Installment)
    savings: Installment;
}
