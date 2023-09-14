import { Module } from '@nestjs/common';
import { CalcController } from './calc.controller';
import { CalcService } from './calc.service';
import { SavingsModule } from './savings/savings.module';

@Module({
    imports: [SavingsModule],
    controllers: [CalcController],
    providers: [CalcService],
})
export class CalcModule {}
