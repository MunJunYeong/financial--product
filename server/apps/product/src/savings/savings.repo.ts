import { Savings } from '@app/database/models/savings.entity';
import { SavingsOption } from '@app/database/models/savingsOptions.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SavingsDTO } from './dto/common.dto';

@Injectable()
export class SavingsRepo {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async createTestData() {
    for(let i = 0; i < 5; i++){
        const temp: SavingsDTO = {
            dcls_month : "da",
            fin_co_no : "aa",
            fin_prdt_cd : "aab" + i,
            fin_prdt_nm : "aa",
            kor_co_nm : "aa",
            max_limit : 2,
        }
        const savings = await Savings.create(temp);
        console.log(savings)
    }
    return true
  }

  // async deleteSavings(): Promise<void> {
  //     await this.savingsModel.destroy({ where: {} });
  // }
  // async deleteOptSavings(): Promise<void> {
  //     await this.savingsOptionModel.destroy({ where: {} });
  // }
}
