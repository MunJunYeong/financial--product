
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavingsService } from './savings.service';

@Controller('/savings')
export class SavingsController {
    constructor(private readonly savingsService: SavingsService) {}

    // scheduling에서 매번 상품 업데이트
    @Post('')
    async postSavings(){
        return await this.savingsService.saveSavings();
    }

    // 정기예금
    @Get('')
    async findSavings(){
        return await this.savingsService.getSavings();
    }

    // 적금
    @Get('/installment')
    async findInstallmentSavings(){

    }

    // Ping-Pong Test 
    @Get('/ping')
    testPingPong(){
        return "pong"
    }

}