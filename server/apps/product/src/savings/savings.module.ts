import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'libs';
import { SavingsController } from './savings.controller';
import { SavingsService } from './savings.service';

@Module({
  imports : [
    ConfigurationModule,
    // TODO: HttpModule - Axios module & service seperate
    HttpModule.registerAsync({
      useFactory :  ()=> ({
        timeout : 5000,
        maxRedirects : 5,
      })
    })
  ],
  controllers: [SavingsController],
  providers: [SavingsService]
})
export class SavingsModule {}
