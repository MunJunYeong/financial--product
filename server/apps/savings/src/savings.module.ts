import { Module } from '@nestjs/common';
import { LibModule } from 'libs/libs.module';
import { SavingsController } from './savings.controller';
import { SavingsService } from './savings.service';

@Module({
  imports: [LibModule],
  controllers: [SavingsController],
  providers: [SavingsService],
})
export class SavingsModule {}
