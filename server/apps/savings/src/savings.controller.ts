import { Controller, Get } from '@nestjs/common';
import { SavingsService } from './savings.service';

@Controller()
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @Get()
  getHello(): string {
    return this.savingsService.getHello();
  }
}
