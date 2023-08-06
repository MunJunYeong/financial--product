// vendor
import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// cus
import { User } from '@app/database/models/user';
import { Product } from '@app/database/models/product';

@Injectable()
export class UserRepo {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  // find user by id
  async FindUserByID(id: string): Promise<User | null> {
    let res: User;
    try {
      res = await User.findOne({
        where: { id: id },
      });
    } catch (err) {
      throw err;
    }

    return res;
  }

  // find user by user_idx
  async FindUserByIdx(userIdx: number): Promise<User | null> {
    let res: User;
    try {
      res = await User.findOne({
        where: { user_idx: userIdx },
      });
    } catch (err) {
      throw err;
    }

    return res;
  }

  // find user by user_idx include product
  async FindUserByIdxIncProd(userIdx: number): Promise<User | null> {
    let res: User;
    try {
      res = await User.findOne({
        where: { user_idx: userIdx },
        include: [{
          model: Product
        }]
      });
    } catch (err) {
      throw err;
    }

    return res;
  }
}
