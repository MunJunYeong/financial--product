// vendor
import { Sequelize } from 'sequelize-typescript';

// cus
import { ConfigurationService } from '../../configuration/src';
import { Savings } from './models/savings.entity';
import { SavingsOption } from './models/savingsOptions.entity';
import { Installment } from './models/installments.entity';
import { InstallmentOption } from './models/installmentOptions.entity';
import { User } from './models/user';
import { Product } from './models/product';
import { CommonService } from '@app/common';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        inject: [ConfigurationService, CommonService],
        useFactory: async (config: ConfigurationService, common: CommonService) => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: config.get<string>(common.Configs.DB_HOST),
                port: config.get<number>(common.Configs.DB_PORT),
                username: config.get<string>(common.Configs.DB_USERNAME),
                password: config.get<string>(common.Configs.DB_PASSWORD),
                database: config.get<string>(common.Configs.DB_DATABASE),
                logging: false,
            });

            sequelize.addModels([User, Savings, SavingsOption, Installment, InstallmentOption, Product]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
