// vendor
import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

// cus
import { UserProductsService } from './user_products.service';


// swagger에 tag를 생성해줌
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('/')
export class UserProductsController {
  constructor(private readonly userProdsService: UserProductsService) {}

}