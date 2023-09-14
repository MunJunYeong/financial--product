import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@ApiResponse({
    status: 500,
    description: 'Internal server error',
})
@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    // Ping-Pong Test
    @ApiOperation({ summary: 'product ping pong test' })
    @ApiOkResponse({
        description: '핑퐁 성공 유무',
        schema: {
            example: { success: 'pong' },
        },
    })
    @Get('/ping')
    testPingPong() {
        return 'pong';
    }
}
