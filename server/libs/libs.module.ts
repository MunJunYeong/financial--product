import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/src/database.module';
import { CommonModule } from './common/src/common.module';
import { ConfigurationModule } from './configuration/src/configuration.module';
import { MiddlewareModule } from '@app/middleware';

@Module({
  imports: [DatabaseModule, CommonModule, ConfigurationModule, MiddlewareModule],
  exports: [DatabaseModule, CommonModule, ConfigurationModule, MiddlewareModule],
})
export class LibModule {}
