import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigurationModule } from '@app/configuration';

@Module({
  imports : [
    ConfigurationModule,
  ],
  providers: [
    ...databaseProviders
  ],
  exports: [
    ...databaseProviders
  ],
})
export class DatabaseModule {}
