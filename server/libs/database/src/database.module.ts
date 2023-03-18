import { ConfigurationModule } from '@app/configuration';
import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript'
import { DatabaseService } from './database.service';
import { ConfigurationService } from '@app/configuration';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports : [
    ConfigurationModule,
  ],
  providers: [
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
        await sequelize.authenticate();
        // sequelize.addModels([Cat]);
        await sequelize.sync();
        return sequelize;
      },
    },
    DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
