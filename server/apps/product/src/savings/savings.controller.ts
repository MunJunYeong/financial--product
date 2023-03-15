
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavingsService } from './savings.service';

@Controller('/savings')
export class SavingsController {
    constructor(private readonly savingsService: SavingsService) {}

    @Post('')
    async postSavings(){
        return await this.savingsService.saveSavings();
    }

    @Get('')
    async findSavings(){
        return await this.savingsService.getSavings();
    }

    @Get('/installment')
    async findInstallmentSavings(){

    }

    @Get('/ping')
    testPingPong(){
        return "pong"
    }

}