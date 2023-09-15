import { Module } from '@nestjs/common';
import { CalcController } from './calc.controller';
import { CalcService } from './calc.service';
import { SavingsModule } from './savings/savings.module';
import { CommonModule, ConfigurationModule } from 'libs';

@Module({
    imports: [SavingsModule, ConfigurationModule, CommonModule],
    controllers: [CalcController],
    providers: [CalcService],
})
export class CalcModule {}
