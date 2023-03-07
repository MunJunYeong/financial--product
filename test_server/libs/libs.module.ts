import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/src/database.module';
import { CommonModule } from './common/src/common.module';
import { ConfigurationModule } from './configuration/src/configuration.module';

@Module({
  imports: [DatabaseModule, CommonModule, ConfigurationModule],
  exports: [DatabaseModule, CommonModule, ConfigurationModule],
})
export class LibModule {}
