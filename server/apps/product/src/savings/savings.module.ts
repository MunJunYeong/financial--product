import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs';
import { SavingsController } from './savings.controller';
import { SavingsService } from './savings.service';
import { SavingsRepo } from './savings.repo';

@Module({
  imports: [
    // TODO: HttpModule - Axios module & service seperate
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    DatabaseModule,
  ],
  controllers: [SavingsController],
  providers: [SavingsService, SavingsRepo],
  exports: [SavingsRepo],
})
export class SavingsModule {}
