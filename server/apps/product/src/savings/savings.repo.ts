// vendor
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// cus
import { InstallmentDTO, InstallmentOptionsDTO, SavingsDTO, SavingsOptionsDTO } from './dto/common.dto';
import { Installment } from '@app/database/models/installments.entity';
import { InstallmentOption } from '@app/database/models/installmentOptions.entity';
import { Savings } from '@app/database/models/savings.entity';
import { SavingsOption } from '@app/database/models/savingsOptions.entity';
import { DatabaseService } from '@app/database/database.service';

@Injectable()
export class SavingsRepo {
  constructor(
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    private readonly dbService: DatabaseService,
  ) {}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Savings method

  async SaveSavings(savings: SavingsDTO[], savingsOptList: SavingsOptionsDTO[]): Promise<boolean> {
    try {
      await this.dbService.transaction(async (transaction) => {
        // save savings + opt
        await Savings.bulkCreate(savings, { transaction });
        await SavingsOption.bulkCreate(savingsOptList, { transaction });
      });
    } catch (err) {
      throw err;
    }
    return true;
  }

  async DeleteAllSavings(): Promise<boolean> {
    try {
      await this.dbService.transaction(async (transaction) => {
        // delete savings + opt
        await Savings.destroy({ where: {}, transaction });
        await SavingsOption.destroy({ where: {}, transaction });
      });
    } catch (err) {
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
    try {
      await this.dbService.transaction(async (transaction) => {
        // save installment + opt
        await Installment.bulkCreate(installmentList, { transaction });
        await InstallmentOption.bulkCreate(installmentOptList, { transaction });
      });
    } catch (err) {
      throw err;
    }
    return true;
  }

  async DeleteAllInstallment(): Promise<boolean> {
    try {
      await this.dbService.transaction(async (transaction) => {
        // delete installment + opt
        await Installment.destroy({ where: {}, transaction });
        await InstallmentOption.destroy({ where: {}, transaction });
      });
    } catch (err) {
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
