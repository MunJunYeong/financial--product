// vendor
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// cus
import { UserRepo } from './user.repo';
import { LoginInputDTO, LoginOutputDTO, SignUpDTO } from './dto/common.dto';
import { User } from '@app/database/models/user';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo, private jwtService: JwtService) {}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async SaveUser(data: SignUpDTO) {
    // id 중복 확인
    try {
      const targetUser = await this.userRepo.FindUserByID(data.id);
      if (targetUser) {
        return false;
      }
    } catch (err) {
      throw err;
    }

    // pw 암호화
    const bcryptPw = await bcrypt.hash(data.password, 10);

    try {
      await this.userRepo.SaveUser(data.id, bcryptPw, data.name, data.email);
    } catch (err) {
      throw err;
    }
    return true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    const payload = targetUser.dataValues;
    delete payload.pw;
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '3h' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '14d' }),
    };
  }
}
