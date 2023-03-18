import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/src/database.module';
import { CommonModule } from './common/src/common.module';
import { ConfigurationModule } from './configuration/src/configuration.module';
import { MiddlewareModule } from './middleware/src';
import { AxiosModule } from './axios/src';
import { SchedulingModule } from './scheduling/src/scheduling.module';

@Module({
  imports: [ 
    CommonModule, ConfigurationModule, 
    DatabaseModule, MiddlewareModule, 
    AxiosModule, SchedulingModule
  ],
  exports: [ 
    CommonModule, ConfigurationModule, 
    DatabaseModule, MiddlewareModule, 
    AxiosModule, SchedulingModule
  ],
})
export class LibModule {}
