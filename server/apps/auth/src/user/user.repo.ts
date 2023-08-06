// vendor
import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// cus
import { User } from '@app/database/models/user';

@Injectable()
export class UserRepo {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

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
}
