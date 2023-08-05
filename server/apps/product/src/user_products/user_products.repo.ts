// vendor
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// cus

@Injectable()
export class UserProductsRepo {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}
}
