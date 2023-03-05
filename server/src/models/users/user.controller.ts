import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserContoller {
    constructor(private readonly userService: UserService) {}

    
}