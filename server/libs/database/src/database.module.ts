import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigurationModule } from '@app/configuration';
import { DatabaseService } from './database.service';
import { CommonModule } from '@app/common';

@Module({
    imports: [ConfigurationModule, CommonModule],
    providers: [...databaseProviders, DatabaseService],
    exports: [...databaseProviders, DatabaseService],
})
export class DatabaseModule {}
