// vendor
import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// cus
import { User } from '@app/database/models/user';

@Injectable()
export class UserRepo {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async SaveUser(id: string, password: string, name: string, email: string): Promise<Boolean> {
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

    return res !== null ? true : false;
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
}
