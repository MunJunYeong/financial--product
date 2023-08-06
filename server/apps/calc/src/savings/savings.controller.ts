import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// common
import { CalcSavingsOutputDTO, SavingsOutputDTO, PrePostPaymentDTO, SavingsInputDTO } from './dto/common.dto';
import { SavingsService } from './savings.service';
import { FreeSavingsInputDTO } from './dto/controller.dto';

@ApiTags('Savings')
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('/calc')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 자유적립적금 계산기
  @ApiOperation({ summary: 'calc free savings' })
  @ApiOkResponse({
    description: '자유적립 적금 계산기',
    type: CalcSavingsOutputDTO,
  })
  @Get('/free')
  calculateFreeSavings(@Query() freeSavingsInputDTO: FreeSavingsInputDTO): CalcSavingsOutputDTO {
    const { totalAmount, duration, rate } = freeSavingsInputDTO;
    // TODO:

    return null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 정기적금 계산기
  @ApiOperation({ summary: 'calc regular savings' })
  @ApiOkResponse({
    description: '정기 적금 계산기',
    type: CalcSavingsOutputDTO,
  })
  @Get('/savings')
  calculateRegularSavings(@Query() savingsInputDTO: SavingsInputDTO): SavingsOutputDTO {
    return this.savingsService.calculateRegularSavings(savingsInputDTO);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 예금 예치 계산기
  @ApiOperation({ summary: 'calc  deposit' })
  @ApiOkResponse({
    description: '정기 예금 계산기',
    type: SavingsOutputDTO,
  })
  @Get('/deposit')
  calculateDeposits(@Query() savingsInputDTO: SavingsInputDTO): SavingsOutputDTO {
    return this.savingsService.calculateDeposits(savingsInputDTO);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 선납이연 계산기
  @ApiOperation({ summary: 'calc prepost savings' })
  @Get('/prepost')
  findSavingsDate(@Body() inputSavings: PrePostPaymentDTO) {
    //TODO: validateeion 추가하기
    const tempDate = new Date(inputSavings.startDate);
    inputSavings.startDate = tempDate;
    const temp = this.savingsService.calcPrePost(inputSavings);
  }
}
