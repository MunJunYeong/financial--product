import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrePostPayment } from './dto/common.dto';
import { PrepostService } from './prepost.service';

@Controller('prepost')
export class PrepostController {
  constructor(private readonly prepostService: PrepostService) {}

  @Post('')
    findSavingsDate(@Body() inputSavings: PrePostPayment){
        //TODO: validation 추가하기
        const temp = this.prepostService.calcPrePost(inputSavings);
        console.log(inputSavings)
    }

}
