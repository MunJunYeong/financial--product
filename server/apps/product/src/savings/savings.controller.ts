
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Savings } from './dto/common.dto';
import { SavingsService } from './savings.service';

@Controller('savings')
export class SavingsContoller {
    constructor(private readonly savingsService: SavingsService) {}

    @Post('basic')
    findSavings(@Body() inputSavings: Savings){
        //TODO: validation 추가하기
        const temp = this.savingsService.getSavings(inputSavings);
        console.log(inputSavings)
    }

}