import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
    Errors = {
        NOT_SUPPORTED: 'not supported',
        FETCH_SAVINGS: 'failed to get savings data',
        DB_SAVE_SAVINGS: 'db error : failed to save savings',
        DB_GET_SAVINGS: 'db error : failed to get savings',
        FETCH_INSTALLMENT: 'failed to get installment data',
        DB_GET_INSTALLMENT: 'db error : failed to get installment',
        DB_SAVE_INSTALLMENT: 'db error : failed to save installment',
    };

    Configs = {
        ACCESS_TOKEN: 'API_ACCESS_TOKEN',
        DB_HOST: 'DB_HOST',
        DB_PORT: 'DB_PORT',
        DB_USERNAME: 'DB_USERNAME',
        DB_PASSWORD: 'DB_PASSWORD',
        DB_DATABASE: 'DB_DATABASE',
        JWT_SECRET: 'JWT_SECRET',
        AUTH_PORT: 'AUTH_PORT',
        CALC_PORT: 'CALC_PORT',
        PROD_PORT: 'PROD_PORT',
    };

    Sign = {

    };
}
