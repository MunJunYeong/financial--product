// vendor
import { Model, Column, PrimaryKey, Table, DataType, AutoIncrement, HasMany } from 'sequelize-typescript';

// cus
import { Product } from './product';
import { ApiProperty } from '@nestjs/swagger';

@Table({
    // default지만 명시
    timestamps: true,
})
export class User extends Model<User> {
    @ApiProperty({ description: 'pk(1)' })
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    user_idx: number;

    @ApiProperty({ description: '아이디' })
    @Column
    id: string;

    @ApiProperty({ description: '비밀번호' })
    @Column
    pw: string;

    @ApiProperty({ description: '이름' })
    @Column
    name: string;

    @ApiProperty({ description: '이메일' })
    @Column
    email: string;

    @ApiProperty({ description: 'OTP 활성화 여부' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    @Column
    otp_enabled: boolean;

    @ApiProperty({ description: 'OTP 비밀키' })
    @Column
    otp_secret: string;

    @ApiProperty({ description: 'OTP URL' })
    @Column
    otp_auth_url: string;

    @HasMany(() => Product)
    products: Product[];
}
