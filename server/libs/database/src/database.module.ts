import { ConfigurationModule } from '../../configuration/src';
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

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
