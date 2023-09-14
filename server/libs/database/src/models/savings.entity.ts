// vendor
import { Model, Column, PrimaryKey, Table, Unique, DataType, AutoIncrement, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// cus
import { SavingsOption } from './savingsOptions.entity';
@Table
export class Savings extends Model<Savings> {
    @ApiProperty({ description: 'pk(1)' })
    @PrimaryKey
    @Column(DataType.BIGINT)
    savings_idx: number;

    @ApiProperty({ description: '발행년월(202304)' })
    @Column
    dcls_month: string;

    @ApiProperty({ description: '회사코드' })
    @Column
    fin_co_no: string;

    @ApiProperty({ description: '상품 코드(1111)' })
    @Unique
    @Column
    fin_prdt_cd: string;

    @ApiProperty({ description: '은행 이름(우리은행)' })
    @Column
    kor_co_nm: string;

    @ApiProperty({ description: '상품 이름(우리SUPER주거래적금)' })
    @Column
    fin_prdt_nm: string;

    @ApiProperty({ description: '월 최대 납입 금액(500000)' })
    @Column
    max_limit: number;

    @HasMany(() => SavingsOption)
    options: SavingsOption[];
}
