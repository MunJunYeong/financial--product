import { Injectable } from '@nestjs/common';
import { CreatePrepostDto } from './dto/create-prepost.dto';
import { UpdatePrepostDto } from './dto/update-prepost.dto';

@Injectable()
export class PrepostService {
  create(createPrepostDto: CreatePrepostDto) {
    return 'This action adds a new prepost';
  }

  findAll() {
    return `This action returns all prepost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prepost`;
  }

  update(id: number, updatePrepostDto: UpdatePrepostDto) {
    return `This action updates a #${id} prepost`;
  }

  remove(id: number) {
    return `This action removes a #${id} prepost`;
  }
}
