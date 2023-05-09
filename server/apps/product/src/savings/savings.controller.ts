import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SavingsService } from './savings.service';

@Controller('/product')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  // TODO: scheduling에서 매번 상품 업데이트

  // 적금
  @Post('/savings')
  async postSavings() {
    return await this.savingsService.SaveSavings();
  }

  @Get('savings')
  async postInstallmentSavings() {
    return await this.savingsService.GetSavings();
  }

  // 정기예금
  @Post('/installment')
  async findSavings() {
    return await this.savingsService.SaveInstallmentSavings();
  }

  @Get('installment')
  async findInstallmentSavings() {
    return await this.savingsService.GetInstallment();
  }

  // Ping-Pong Test
  @Get('/ping')
  testPingPong() {
    return 'pong';
  }
}
