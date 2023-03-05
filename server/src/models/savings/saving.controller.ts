import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavingsService } from './saving.service';

@Controller('savings')
export class SavingsContoller {
    constructor(private readonly savingsService: SavingsService) {}

    
}