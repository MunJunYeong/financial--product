// vendor
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// cus
import { InstallmentDTO, InstallmentOptionsDTO, SavingsDTO, SavingsOptionsDTO } from './dto/common.dto';
import { Installment } from '@app/database/models/installments.entity';
import { InstallmentOption } from '@app/database/models/installmentOptions.entity';
import { Savings } from '@app/database/models/savings.entity';
import { SavingsOption } from '@app/database/models/savingsOptions.entity';

@Injectable()
export class SavingsRepo {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Savings method

  async SaveSavings(savings: SavingsDTO[], savingsOptList: SavingsOptionsDTO[]): Promise<boolean> {
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

  async DeleteAllSavings(): Promise<boolean> {
    const transaction = await this.sequelize.transaction();
    try {
      // delete savings + opt
      await Savings.destroy({ where: {}, transaction });
      await SavingsOption.destroy({ where: {}, transaction });

      // commit
      await transaction.commit();
    } catch (err) {
      // rollback
      await transaction.rollback();
      throw err;
    }
    return true;
  }

  async GetSavings(): Promise<SavingsDTO[]> {
    return await Savings.findAll();
  }

  async GetSavingsOpts(): Promise<SavingsOptionsDTO[]> {
    return await SavingsOption.findAll();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Installment method

  async SaveInstallments(
    installmentList: InstallmentDTO[],
    installmentOptList: InstallmentOptionsDTO[],
  ): Promise<boolean> {
    const transaction = await this.sequelize.transaction();

    throw new HttpException({
      message : "failed to save installment",
      error : "error.message"
    }, HttpStatus.INTERNAL_SERVER_ERROR)
    
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

  async DeleteAllInstallment(): Promise<boolean> {
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

  async GetInstallments(): Promise<InstallmentDTO[]> {
    return await Installment.findAll();
  }
  async GetInstallmentOpts(): Promise<InstallmentOptionsDTO[]> {
    return await InstallmentOption.findAll();
  }
}
