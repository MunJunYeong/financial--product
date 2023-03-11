import { Module } from '@nestjs/common';
import { PrepostService } from './prepost.service';
import { PrepostController } from './prepost.controller';

@Module({
  controllers: [PrepostController],
  providers: [PrepostService]
})
export class PrepostModule {}
