import { Module } from '@nestjs/common';
import { SavingsContoller } from './saving.controller';
import { SavingsService } from './saving.service';


@Module({
    controllers: [SavingsContoller],
    providers: [SavingsService]
  })
  export class SavingsModule {}
  