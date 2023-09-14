import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigurationModule } from '@app/configuration';
import { DatabaseService } from './database.service';

@Module({
    imports: [ConfigurationModule],
    providers: [...databaseProviders, DatabaseService],
    exports: [...databaseProviders, DatabaseService],
})
export class DatabaseModule {}
