import { Controller, Get, Post, Body, Param, HttpCode, Put, ParseIntPipe, Request } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// cus
import { UserService } from './user.service';
import { LoginInputDTO, LoginOutputDTO, SignUpDTO, UserDTO } from './dto/common.dto';
import { OtpEnabledDTO, TokenDTO } from './dto/controller.dto';

@ApiResponse({
    status: 500,
    description: 'Internal server error',
})
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 회원가입
    @ApiTags('SignUp')
    @ApiOperation({ summary: 'signup' })
    @ApiOkResponse({
        description: '회원가입',
        schema: {
            type: 'boolean',
            example: true,
        },
    })
    @Post('/signup')
    @HttpCode(200)
    async SignUp(@Body() bodyData: SignUpDTO): Promise<Boolean> {
        return await this.userService.SaveUser(bodyData);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 로그인
    @ApiTags('SignIn')
    @ApiOperation({ summary: 'signin' })
    @ApiOkResponse({
        description: '로그인',
        schema: {
            type: 'object',
            properties: {
                access_token: {
                    type: 'string',
                    description: 'access token',
                    example: 'string',
                },
                refresh_token: {
                    type: 'string',
                    description: 'refresh token',
                    example: 'string',
                },
            },
        },
    })
    @Post('/signin')
    async SignIn(@Body() bodyData: LoginInputDTO): Promise<LoginOutputDTO> {
        return await this.userService.Login(bodyData);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Update otp_enabled
    @ApiTags('Authenticate')
    @ApiOperation({ summary: 'authenticate' })
    @ApiOkResponse({
        description: 'otp 활성화 update',
        schema: {
            type: 'boolean',
            example: true,
        },
    })
    @Put('/:user_idx/otp')
    async UpdateOtpEnabled(@Param('user_idx', ParseIntPipe) userIdx: number, @Body() otpEnabledDTO: OtpEnabledDTO) {
        return await this.userService.UpdateOtpEnabled(userIdx, otpEnabledDTO.otp_enabled);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Update user
    @ApiTags('UpdateUser')
    @ApiOperation({ summary: 'update user' })
    @ApiOkResponse({
        description: '사용자 정보 업데이트',
        schema: {
            type: 'boolean',
            example: true,
        },
    })
    @Put('/:user_idx')
    async UpdateUser(@Param('user_idx', ParseIntPipe) userIdx: number, @Body() user: UserDTO) {
        return await this.userService.UpdateUser(userIdx, user);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 인증
    @ApiTags('Authenticate')
    @ApiOperation({ summary: 'authenticate' })
    @ApiOkResponse({
        description: '토큰 인증',
        schema: {
            type: 'boolean',
            example: true,
        },
    })
    @Get('/authenticate')
    async Authenticate() {
        return true; // middleware 통과했으면 ok
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Refresh token
    @ApiTags('Authenticate')
    @ApiOperation({ summary: 'refresh access_token' })
    @ApiOkResponse({
        description: 'access_token 재생성',
    })
    @Post('/refresh')
    async RefreshToken(@Body() token: TokenDTO, @Request() req: any) {
        const decodedUser = req['user'];

        return await this.userService.RefreshAccessToken(decodedUser, token.refresh_token);
    }
}
