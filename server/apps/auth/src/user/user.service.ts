// vendor
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt'

// cus
import { UserRepo } from './user.repo';
import { LoginInputDTO, SignUpDTO } from './dto/common.dto';
import { User } from '@app/database/models/user';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService, private readonly userRepo: UserRepo) {}

  async SaveUser(data: SignUpDTO) {
    let res: any;

    // pw 암호화
    const bcryptPw = await bcrypt.hash(data.password, 10);

    try {
      res = await this.userRepo.SaveUser(data.id, bcryptPw, data.name, data.email);
    } catch (err) {
      throw err;
    }
    return res;
  }

  async Login(data: LoginInputDTO) {
    let targetUser: User = null;

    try {
      targetUser = await this.userRepo.FindUserByID(data.id);

      if (targetUser === null){
        return 
      }
    } catch (err) {
      throw err;
    }

    if (data.password === targetUser.pw) {
      
    }

  }
}
