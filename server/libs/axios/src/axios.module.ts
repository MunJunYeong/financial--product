import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AxiosService } from './axios.service';

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 5000,
                maxRedirects: 5,
            }),
        }),
    ],
    providers: [AxiosService],
    exports: [AxiosService],
})
export class AxiosModule {}
