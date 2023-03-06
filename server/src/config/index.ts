import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, 
            envFilePath: process.env.NODE_ENV == 'dev' ? '.dev.env' : '.prod.env',
        })
    ]
})
export class ConfigurationModule {}