import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/service.dto';


@Injectable()
export class UserService {
  create(createUserDto: UpdateProfileDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateProfileDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
