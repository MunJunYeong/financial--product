import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDTO } from './dto/common.dto';

@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('SignUp')
  @ApiOperation({ summary: 'signup' })
  @ApiOkResponse({
    description: '회원가입',
    schema: {
      example: { success: true },
    },
  })
  @Post('/signup')
  async SignUp(@Body() inputSavings: SignUpDTO) {
    return await this.userService.SaveUser(inputSavings)
  }
}
