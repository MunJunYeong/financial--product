// vendor
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

// cus
import { UserRepo } from './user.repo';
import { SignUpDTO } from './dto/common.dto';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService, private readonly userRepo: UserRepo) {}

  async SaveUser(data: SignUpDTO) {
    let res: any;
    try {
      res = await this.userRepo.SaveUser(data.id, data.password, data.name, data.email);
    } catch (err) {
      throw err;
    }
    return res;
  }
}
