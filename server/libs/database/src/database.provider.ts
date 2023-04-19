import { ConfigurationService } from '../../configuration/src';
import { Sequelize } from 'sequelize-typescript'
import { Savings } from './models/savings/savings.entity';
import { SavingsOption } from './models/savingsOption/savingsOptions.entity';

export const DatabaseProvider = [
    {
      provide: 'SEQUELIZE',
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => {
        console.log(configService);
        const sequelize = new Sequelize({
            dialect : 'postgres',
            host : configService.get<string>('DB_HOST'),
            port : configService.get<number>('DB_PORT'),
            username : configService.get<string>('DB_USERNAME'),
            password : configService.get<string>('DB_PASSWORD'),
            database : configService.get<string>('DB_DATABASE'),
        });
        
        sequelize.addModels([Savings]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];