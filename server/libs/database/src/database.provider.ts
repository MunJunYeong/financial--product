import { ConfigurationService } from '../../configuration/src';
import { Sequelize } from 'sequelize-typescript'
import { Savings } from './models/savings.entity';
import { SavingsOption } from './models/savingsOptions.entity';

export const DatabaseProvider = [
    {
      provide: 'SEQUELIZE',
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => {
        const sequelize = new Sequelize({
            dialect : 'postgres',
            host : configService.get<string>('DB_HOST'),
            port : configService.get<number>('DB_PORT'),
            username : configService.get<string>('DB_USERNAME'),
            password : configService.get<string>('DB_PASSWORD'),
            database : configService.get<string>('DB_DATABASE'),
        });
        
        sequelize.addModels([Savings, SavingsOption]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];