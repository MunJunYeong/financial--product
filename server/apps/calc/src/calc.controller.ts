import { Controller, Get } from '@nestjs/common';
import { CalcService } from './calc.service';

@Controller()
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  @Get()
  getHello(): string {
    return this.calcService.getHello();
  }
}
