import { ConfigurationModule } from '../../configuration/src';
import { Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';

@Module({
  imports : [
    ConfigurationModule,
  ],
  providers: [
    ...DatabaseProvider
  ],
  exports: [
    ...DatabaseProvider
  ],
})
export class DatabaseModule {}
