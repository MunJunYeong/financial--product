import { Savings } from '@app/database/models/savings.entity';
import { SavingsOption } from '@app/database/models/savingsOptions.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InstallmentDTO, InstallmentOptionsDTO, SavingsDTO, SavingsOptionsDTO } from './dto/common.dto';
import { Installment } from '@app/database/models/installments.entity';
import { InstallmentOption } from '@app/database/models/installmentOptions.entity';

@Injectable()
export class SavingsRepo {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async saveSavings(savings: SavingsDTO[], savingsOptList: SavingsOptionsDTO[]): Promise<boolean>{
    const transaction = await this.sequelize.transaction();

    try {
      // save savings + opt
      await Savings.bulkCreate(savings, { transaction });
      await SavingsOption.bulkCreate(savingsOptList, { transaction });
      // commit
      await transaction.commit();
    } catch (err) {
      // rollback
      await transaction.rollback();
      throw err;
    }
    return true;
  }
  async saveInstallments(installmentList: InstallmentDTO[], installmentOptList: InstallmentOptionsDTO[]): Promise<boolean>{
    const transaction = await this.sequelize.transaction();

    try {
      // save savings + opt
      await Installment.bulkCreate(installmentList, { transaction });
      await InstallmentOption.bulkCreate(installmentOptList, { transaction });
      // commit
      await transaction.commit();
    } catch (err) {
      // rollback
      await transaction.rollback();
      throw err;
    }
    return true;
  }


  async deleteAllSavings(): Promise<boolean> {
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
  async deleteAllInstallment(): Promise<boolean> {
    const transaction = await this.sequelize.transaction();
    try {
      // delete savings + opt
      await Installment.destroy({ where: {}, transaction });
      await InstallmentOption.destroy({ where: {}, transaction });

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
