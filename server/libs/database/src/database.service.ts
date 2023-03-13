import { ConfigurationService } from '@app/configuration';
import { Injectable } from '@nestjs/common';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

@Injectable()
export class DatabaseService {
    constructor(private readonly configService: ConfigurationService){}

    createPostgres(): SequelizeModuleOptions {
        return {
            dialect : 'postgres',
            host : this.configService.get<string>('DB_HOST'),
            port : this.configService.get<number>('DB_PORT'),
            username : this.configService.get<string>('DB_USERNAME'),
            password : this.configService.get<string>('DB_PASSWORD'),
            database : this.configService.get<string>('DB_DATABASE'),
            autoLoadModels : true,
            synchronize : true
            
        }
    }
}
