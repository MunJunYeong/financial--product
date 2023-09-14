import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsBoolean, IsString, IsDate } from 'class-validator';

// 회원가입
export class SignUpDTO {
    @ApiProperty({ description: 'ID' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'password' })
    @IsString()
    password: string;

    @ApiProperty({ description: 'name' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'email' })
    @IsString()
    email: string;
}

// 로그인
export class LoginInputDTO {
    @ApiProperty({ description: 'ID' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'Password' })
    @IsString()
    password: string;
}

export class LoginOutputDTO {
    @ApiProperty({ description: 'access token' })
    @IsString()
    access_token: string;

    @ApiProperty({ description: 'refresh token' })
    @IsString()
    refresh_token: string;
}

// TODO: User DTO는 필요에 의해서 추가적으로 늘려가기
export class UserDTO {
    @ApiProperty({ description: 'email' })
    @IsString()
    email: string;

    //
    @ApiProperty({ description: 'name' })
    @IsString()
    name: string;
}
