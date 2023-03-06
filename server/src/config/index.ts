import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, 
            envFilePath: process.env.NODE_ENV == 'dev' ? '.dev.env' : '.prod.env',
            // ignoreEnvFile: process.env.NODE_ENV === 'prod',
            // validationSchema: Joi.object({
                // NOED_ENV: Joi.string().valid('dev', 'prod').required(),
                // DB_HOST: Joi.string().required(),
                // DB_PORT: Joi.string().required(),
                // DB_USERNAME: Joi.string().required(),
                // DB_PASSWORD: Joi.string().required(),
                // DB_NAME: Joi.string().required(),
            // }), 
        })
    ]
})
export class ConfigurationModule {}