// vendor
import {
    Model,
    DataType,
    Column,
    PrimaryKey,
    Table,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// cus
import { Savings } from './savings.entity';
@Table
export class SavingsOption extends Model<SavingsOption> {
    @ApiProperty({ description: 'pk(1)' })
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    option_idx: number;

    @ApiProperty({ description: '상품 코드(1111)' })
    @Column
    fin_prdt_cd: string;

    @ApiProperty({ description: '이자 유형(단리 | 복리)' })
    @Column
    intr_rate_type_nm: string;

    @ApiProperty({ description: '적립 유형(자유적립식 | 정액정립식)' })
    @Column
    rsrv_type_nm: string;

    @ApiProperty({ description: '적금 기간(12)' })
    @Column
    save_trm: string;

    @ApiProperty({ description: '금리(4)' })
    @Column({
        type: DataType.FLOAT,
    })
    intr_rate: string;

    @ApiProperty({ description: '최대 금리(4.5)' })
    @Column({
        type: DataType.FLOAT,
    })
    intr_rate2: string;

    @ForeignKey(() => Savings)
    @Column
    savings_idx: number;

    @BelongsTo(() => Savings)
    savings: Savings;
}
