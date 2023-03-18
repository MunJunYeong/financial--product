import { Injectable } from '@nestjs/common';
import { SavingsService} from '../../../apps/product/src/savings/savings.service'

@Injectable()
export class SchedulingService {
    constructor(private readonly testrerd: SavingsService){}
    
    test;
    startScheduling(){
        this.test = setInterval(()=>{
            this.testrerd.getSavings();
        }, 2000)
    }

    closeSch() {
        clearInterval(this.test);
        this.test = null
    }
}
