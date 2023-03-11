import { Injectable } from '@nestjs/common';

@Injectable()
export class SavingsService {
  getHello(): string {
    return 'Hello World!';
  }
}
