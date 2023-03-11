import { Injectable } from '@nestjs/common';

const token = process.env.API_ACCESS_TOKEN;

// 참고 url = http://finlife.fss.or.kr/PageLink.do?link=openapi/detail03&menuId=2000127



@Injectable()
export class SavingsService {
    constructor(){}
  
    async schedulingSavings (){
        const url = `http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json?auth=${token}&topFinGrpNo=020000&pageNo=${1}`
        let res: any;
        try{
            res = await fetch(url);
        }catch(err){
            console.log(err)
        }
        const {result} : any = await res.json();
        
        const productList = result.baseList;
        const optionList = result.optionList;
        
        const refinedProduct = {};
        const refinedOption = {};
        
        // data parsing
        const data = {};
        // data.total_count = result.total_count
        
        return result;
    }

    async schedulingInstallmentSavings (){
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

