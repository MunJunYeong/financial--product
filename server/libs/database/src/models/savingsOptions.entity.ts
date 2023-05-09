import { Model, DataType, Column, PrimaryKey, Table, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Savings } from "./savings.entity";

@Table
export class SavingsOption extends Model<SavingsOption> {
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

    @ForeignKey(() => Savings)
    @Column
    savings_idx: number;

    @BelongsTo(() => Savings)
    savings: Savings;
}
