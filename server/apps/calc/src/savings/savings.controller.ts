import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// common
import { CalcSavingsOutputDTO, PrePostPaymentDTO } from './dto/common.dto';
import { SavingsService } from './savings.service';
import { FreeSavingsInputDTO, RegularSavingsInputDTO } from './dto/controller.dto';

@ApiTags('Savings')
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('/calc/savings')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  // 자유적립적금 계산기
  @ApiOperation({ summary: 'calc free savings' })
  @ApiOkResponse({
    description: '적금 정보',
    type: CalcSavingsOutputDTO,
  })
  @Get('free')
  calculateFreeSavings(@Query() freeSavingsInputDTO: FreeSavingsInputDTO): CalcSavingsOutputDTO {
    const { totalAmount, duration, rate } = freeSavingsInputDTO;
    // TODO: 로직추가

    return null;
  }

  // 정기적금 계산기
  @ApiOperation({ summary: 'calc regular savings' })
  @ApiOkResponse({
    description: '적금 정보',
    type: CalcSavingsOutputDTO,
  })
  @Get('reg')
  calculateRegularSavings(@Query() regularSavingsInputDTO: RegularSavingsInputDTO): CalcSavingsOutputDTO {
    const { totalAmount, duration, rate, isSimple } = regularSavingsInputDTO;
    // TODO: 로직추가

    return null;
  }

  // 선납이연 계산기
  @ApiOperation({ summary: 'calc prepost savings' })
  @Get('prepost')
  findSavingsDate(@Body() inputSavings: PrePostPaymentDTO) {
    //TODO: validation 추가하기
    const tempDate = new Date(inputSavings.startDate);
    inputSavings.startDate = tempDate;
    const temp = this.savingsService.calcPrePost(inputSavings);
  }

  // 단순 적금
}
