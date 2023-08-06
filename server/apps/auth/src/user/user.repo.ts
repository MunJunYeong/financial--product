// vendor
import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// cus
import { User } from '@app/database/models/user';

@Injectable()
export class UserRepo {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  // TODO: 이런 간단한 함수의 경우 service에서 만들어서 처리하기.
  async SaveUser(id: string, password: string, name: string, email: string): Promise<User> {
    let res = null;
    try {
      const newUser = new User({
        id: id,
        pw: password,
        name: name,
        email: email,
      });

      res = await newUser.save();
    } catch (err) {
      throw err;
    }

    return res;
  }

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
