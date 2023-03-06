import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InputSavings } from './interfaces/input/saving.interface';
import { SavingsService } from './saving.service';

@Controller('savings')
export class SavingsContoller {
    constructor(private readonly savingsService: SavingsService) {}
    
    @Post('basic')
    findSavings(@Body() inputSavings: InputSavings){
        //TODO: validation 추가하기
        const temp = this.savingsService.getSavings(inputSavings);
        console.log(inputSavings)
    }

}