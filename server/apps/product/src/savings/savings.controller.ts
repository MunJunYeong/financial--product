
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavingsService } from './savings.service';

@Controller('/savings')
export class SavingsController {
    constructor(private readonly savingsService: SavingsService) {}

    // TODO: scheduling에서 매번 상품 업데이트

    // 정기예금
    @Post('')
    async postSavings(){
        return await this.savingsService.saveSavings();
    }

    
    @Get('')
    async postInstallmentSavings(){
        return await this.savingsService.getSavings();
    }

    // 적금
    @Post('/installment')
    async findSavings(){
        return await this.savingsService.saveInstallmentSavings();
    }


    @Get('installment')
    async findInstallmentSavings(){

    }

    // Ping-Pong Test 
    @Get('/ping')
    testPingPong(){
        return "pong"
    }

}