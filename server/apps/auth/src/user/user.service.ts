// vendor
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// cus
import { UserRepo } from './user.repo';
import { LoginInputDTO, LoginOutputDTO, SignUpDTO } from './dto/common.dto';
import { User } from '@app/database/models/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}

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

  async Login(data: LoginInputDTO): Promise<LoginOutputDTO | Boolean> {
    let targetUser: User = null;

    try {
      targetUser = await this.userRepo.FindUserByID(data.id);
    } catch (err) {
      throw err;
    }

    if (targetUser === null) {
      return false;
    }
    
    const isMatch = await bcrypt.compare(data.password, targetUser.pw);
    if (!isMatch) {
      return false;
    }

    // Sequelize 모델 인스턴스가 나오기에 data만 추출
    const payload = targetUser.dataValues
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload),
    };
  }
}
