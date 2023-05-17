import { Controller, Get } from '@nestjs/common';
import { CalcService } from './calc.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Calculate')
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller()
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  // Ping-Pong Test
  @ApiOperation({ summary: 'calc ping pong test' })
  @ApiOkResponse({
    description: '핑퐁 성공 유무',
    schema: {
      example: { success: "pong" },
    },
  })
  @Get('/ping')
  testPingPong() {
    return 'pong';
  }
  
}
