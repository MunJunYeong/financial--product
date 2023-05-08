import { Savings } from '@app/database/models/savings.entity';
import { SavingsOption } from '@app/database/models/savingsOptions.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SavingsRepo {
    constructor(
        @InjectModel(Savings) private savingsModel: typeof Savings,
        @InjectModel(SavingsOption) private savingsOptionModel: typeof SavingsOption,
    ) {}

    async deleteSavings(): Promise<void> {
        await this.savingsModel.destroy({ where: {} });
    }
    async deleteOptSavings(): Promise<void> {
        await this.savingsOptionModel.destroy({ where: {} });
    }


}