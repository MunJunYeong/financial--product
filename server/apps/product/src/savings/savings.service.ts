import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from 'libs';

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
        let res: any;
        try{
            res = this.httpService.get(url).toPromise();
        }catch(err){
            console.log(err)
        }
        
        console.log(res)
        
        const productList = res.baseList;
        const optionList = res.optionList;
        
        const refinedProduct = {};
        const refinedOption = {};
        
        // data parsing
        const data = {};
        // data.total_count = result.total_count
        
        return res;
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

