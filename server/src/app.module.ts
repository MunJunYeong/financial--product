import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/users/user.module';
import { SavingsModule } from './models/savings/saving.module';
import { ConfigurationModule } from './config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigurationModule,UserModule, SavingsModule],
})
export class AppModule {}
