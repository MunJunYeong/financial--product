import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SavingsModule } from './savings/savings.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, SavingsModule],
})
export class AppModule {}
