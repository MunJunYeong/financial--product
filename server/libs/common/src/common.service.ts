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
}
