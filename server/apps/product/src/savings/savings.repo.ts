import { Savings } from '@app/database/models/savings.entity';
import { SavingsOption } from '@app/database/models/savingsOptions.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SavingsDTO, SavingsOptionsDTO } from './dto/common.dto';

@Injectable()
export class SavingsRepo {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async saveSavings(savings: SavingsDTO[], savingsOpts: SavingsOptionsDTO[]): Promise<boolean>{
    const transaction = await this.sequelize.transaction();

    try {
      // save savings + opt
      await Savings.bulkCreate(savings, { transaction });
      await SavingsOption.bulkCreate(savingsOpts, { transaction });
      // commit
      await transaction.commit();
    } catch (err) {
      // rollback
      await transaction.rollback();
      throw err;
    }
    return true;
  }


  async deleteAllProduct(): Promise<boolean> {
    const transaction = await this.sequelize.transaction();
    try {
      // delete savings + opt
      await Savings.destroy({ where: {}, transaction });
      await SavingsOption.destroy({ where: {}, transaction });

      // TODO: delete installment + opt

      // commit
      await transaction.commit();
    } catch (err) {
      // rollback
      await transaction.rollback();
      throw err;
    }
    return true;
  }

}
