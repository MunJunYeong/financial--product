import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from 'libs';
import { map, firstValueFrom, lastValueFrom } from 'rxjs';
import { SavingsDTO, SavingsOptionsDTO } from './dto/common.dto';

// 참고 url = http://finlife.fss.or.kr/PageLink.do?link=openapi/detail03&menuId=2000127



@Injectable()
export class SavingsService {
    constructor(
        private readonly configService: ConfigurationService,
        private readonly httpService: HttpService
    ){}
  
    async saveSavings (){
        const token =  this.configService.get<string>('API_ACCESS_TOKEN')
        const url = `http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json?auth=${token}&topFinGrpNo=020000&pageNo=${1}`
        let data: any;
        try{
            const res = (await firstValueFrom(this.httpService.get(url))).data;
            data = res.result;
        }catch(err){
            console.log(err)
        }
        
        // baseList save
        const baseList: SavingsDTO[] = data.baseList;
        baseList.forEach((product) => {
            const res = {
                dcls_month : product.dcls_month,
                fin_co_no : product.fin_co_no,
                fin_prdt_cd : product.fin_prdt_cd,
                kor_co_nm : product.kor_co_nm,
                fin_prdt_nm : product.fin_prdt_nm,
                max_limit : product.max_limit,
            }
            // TODO: Save Savings
        });
        
        // option save
        const optionList: SavingsOptionsDTO[] = data.optionList;
        optionList.forEach((option) => {
            const res = {
                fin_prdt_cd : option.fin_prdt_cd,
                intr_rate_type_nm : option.intr_rate_type_nm,
                rsrv_type_nm : option.rsrv_type_nm,
                save_trm : option.save_trm,
                intr_rate : option.intr_rate,
                intr_rate2 : option.intr_rate2,
            }
            // TODO: Save Option
        } )
        
        
        // data parsing

        // data.total_count = result.total_count
        
        return data;
    }

    async schedulingInstallmentSavings (){
        const token =  this.configService.get<string>('API_ACCESS_TOKEN')
        const url = `http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json?auth=${token}&topFinGrpNo=020000&pageNo=${1}`
        const res = await fetch(url);
        const {result}: any = await res.json();
    }

    // 정기예금
    async getSavings(){
        // TODO: DB 연동해서 가져오기
    }
    
    // 적금
    async getInstallmentSavings(){
        // TODO: DB 연동해서 가져오기
    }

}

