import { Module } from '@nestjs/common';
import { SavingsContoller } from './savings.controller';
import { SavingsService } from './savings.service';

@Module({
  controllers: [SavingsContoller],
  providers: [SavingsService]
})
export class SavingsModule {}
