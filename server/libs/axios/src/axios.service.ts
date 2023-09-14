import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AxiosService {
    constructor(private readonly httpService: HttpService) {}

    GET<T>(url: string, config?: any): Observable<AxiosResponse<T>> {
        return this.httpService.get<T>(url, config);
    }

    POST<T>(url: string, data?: any, config?: any): Observable<AxiosResponse<T>> {
        return this.httpService.post<T>(url, data, config);
    }

    PUT<T>(url: string, data?: any, config?: any): Observable<AxiosResponse<T>> {
        return this.httpService.put<T>(url, data, config);
    }

    DELETE<T>(url: string, config?: any): Observable<AxiosResponse<T>> {
        return this.httpService.delete<T>(url, config);
    }
}
