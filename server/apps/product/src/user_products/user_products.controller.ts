// vendor
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

// cus
import { UserProductsService } from './user_products.service';
import { ProductDTO } from './dto/common.dto';


// swagger에 tag를 생성해줌
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('/')
export class UserProductsController {
  constructor(private readonly userProdsService: UserProductsService) {}

  /////////////////////
  @ApiTags('User product')
  @ApiOperation({ summary: "save user's product" })
  @ApiOkResponse({
    description: '사용자 적금 저장',
    schema: {
      example: { success: true },
    },
  })
  @Post('/:user_idx')
  async postSavings(@Param('user_idx', ParseIntPipe) user_idx: number, @Body() body: ProductDTO) {
    
  }

}