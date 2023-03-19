import { Model } from "sequelize";
import { Column, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class SavingsOption extends Model<SavingsOption> {
    @Column
    @PrimaryKey
    option_idx: number

    @Column
    fin_prdt_cd: string

    @Column
    intr_rate_type_nm: string

    @Column
    rsrv_type_nm: string

    @Column
    save_trm: string

    @Column
    intr_rate: number

    @Column
    intr_rate2: number

}