import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrePostPayment } from './dto/common.dto';
import { SavingsService } from './savings.service';

@Controller('/calc/savings')
export class SavingsController {
    constructor(private readonly savingsService: SavingsService) {}

    // 선납이연 계산기
  @Post('')
  findSavingsDate(@Body() inputSavings: PrePostPayment) {
    //TODO: validation 추가하기
    const tempDate = new Date(inputSavings.startDate);
    inputSavings.startDate = tempDate;
    const temp = this.savingsService.calcPrePost(inputSavings);
  }

  // 단순 적금 


  // ping - pong test
  @Get('/ping')
  testPingPong(){
    return "pong"
  }

}
