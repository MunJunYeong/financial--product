// vendor
import {
    Model,
    Column,
    PrimaryKey,
    Table,
    DataType,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// cus
import { User } from './user';

@Table
export class Product extends Model<Product> {
    @ApiProperty({ description: 'pk(1)' })
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    product_idx: number;

    @ApiProperty({ description: '상품 이름' })
    @Column
    name: string;

    @ApiProperty({ description: '시작 날짜(2023-09-14)' })
    @Column
    start_date: string;

    @ApiProperty({ description: '종료 날짜(2024-09-14)' })
    @Column
    finish_date: string;

    @ApiProperty({ description: '기간' })
    @Column
    period: number;

    @ApiProperty({ description: '이율' })
    @Column(DataType.FLOAT)
    rate: number;

    @ApiProperty({ description: '월 납입금' })
    @Column
    monthly_payment: number;

    @ApiProperty({ description: '총 이자 금액' })
    // 총 이자
    @Column
    total_interest: number;

    // savings(정기적금), deposit(정기예금)
    @ApiProperty({ description: 'savings | installment' })
    @Column
    type: string;

    @ApiProperty({ description: '이자 유형(단리 | 복리)' })
    @Column
    is_simple: boolean;

    @ForeignKey(() => User)
    @Column
    user_idx: number;

    @BelongsTo(() => User)
    user: User;
}
