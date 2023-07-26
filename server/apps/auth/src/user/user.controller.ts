import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginInputDTO, SignUpDTO } from './dto/common.dto';

@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @ApiTags('SignUp')
  @ApiOperation({ summary: 'signup' })
  @ApiOkResponse({
    description: '회원가입',
    schema: {
      example: { success: true },
    },
  })
  @Post('/signup')
  @HttpCode(200)
  async SignUp(@Body() bodyData: SignUpDTO) {
    return await this.userService.SaveUser(bodyData)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @ApiTags('SignIn')
  @ApiOperation({ summary: 'signin' })
  @ApiOkResponse({
    description: '로그인',
    schema: {
      // example: { success: true },
    },
  })
  @Post('/signin')
  async SignIn(@Body() bodyData: LoginInputDTO) {
    return await this.userService.Login(bodyData)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
}
