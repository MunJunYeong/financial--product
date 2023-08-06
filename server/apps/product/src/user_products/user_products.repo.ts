// vendor
import { Product } from '@app/database/models/product';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// cus

@Injectable()
export class UserProductsRepo {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async SaveUserProduct(product: Product) {
    try{
      return await product.save();
    }catch(err){
      throw err;
    }
  }
}
