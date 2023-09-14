import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseService {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async transaction(callback) {
    const t = await this.sequelize.transaction();

    try {
      await callback(t);
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
