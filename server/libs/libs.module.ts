import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/src/database.module';
import { CommonModule } from './common/src/common.module';
import { MiddlewareModule } from './middleware/src';
import { AxiosModule } from './axios/src';
import { SchedulingModule } from './scheduling/src/scheduling.module';

@Module({
    imports: [CommonModule, DatabaseModule, MiddlewareModule, AxiosModule, SchedulingModule],
    exports: [CommonModule, DatabaseModule, MiddlewareModule, AxiosModule, SchedulingModule],
})
export class LibModule {}
