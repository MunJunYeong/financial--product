import { Module } from '@nestjs/common';
import { AxiosModule, CommonModule, DatabaseModule } from 'libs';
import { SavingsController } from './savings.controller';
import { SavingsService } from './savings.service';
import { SavingsRepo } from './savings.repo';

@Module({
    imports: [AxiosModule, DatabaseModule, CommonModule],
    controllers: [SavingsController],
    providers: [SavingsService, SavingsRepo],
    exports: [SavingsRepo],
})
export class SavingsModule {}
