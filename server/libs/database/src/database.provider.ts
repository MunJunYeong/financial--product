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

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigurationService],
    useFactory: async (configService: ConfigurationService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        logging: false
      });

      sequelize.addModels([User, Savings, SavingsOption, Installment, InstallmentOption, Product]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
