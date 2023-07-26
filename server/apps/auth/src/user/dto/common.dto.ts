import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsBoolean, IsString, IsDate } from 'class-validator';

// 회원가입
export class SignUpDTO {
  @ApiProperty({
    example: 'string',
    description: 'ID',
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'string',
    description: 'password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'string',
    description: 'name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'string',
    description: 'email',
  })
  @IsString()
  email: string;
}

// 로그인
export class LoginInputDTO {
  @ApiProperty({
    example: 'string',
    description: 'ID',
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'string',
    description: 'Password',
  })
  @IsString()
  password: string;
}

export class LoginOutputDTO {
  @ApiProperty({
    example: 'string',
    description: 'access token',
  })
  @IsString()
  access_token: string;

  @ApiProperty({
    example: 'string',
    description: 'refresh token',
  })
  @IsString()
  refresh_token: string;
}

