import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SavingsModule} from '../../../apps/product/src/savings/savings.module'
import { SavingsService } from 'apps/product/src/savings/savings.service';

@Module({
  imports: [SavingsModule],
  providers: [{
    provide: 'SCHE',
      inject: [SavingsService],
      useFactory: async (savingService: SavingsService) => {
        const inst = new SchedulingService(savingService);
        return inst;
      },
  }],
  exports: [],
})
export class SchedulingModule {}
