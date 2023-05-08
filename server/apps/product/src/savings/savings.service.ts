import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from 'libs';
import { map, firstValueFrom, lastValueFrom } from 'rxjs';
import { SavingsDTO, SavingsOptionsDTO } from './dto/common.dto';
import { SavingsRepo } from './savings.repo';

// 참고 url = https://finlife.fss.or.kr/finlife/api/fncCoApi/list.do?menuNo=700051

@Injectable()
export class SavingsService {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly httpService: HttpService,
    private readonly savingsRepo: SavingsRepo,
  ) {}

  async saveSavings() {
    // 기존 데이터 전부 삭제
    {
      try {
        await this.savingsRepo.deleteAllProduct();
      } catch (err) {
        console.log(err);
      }
    }

    const token: string = this.configService.get<string>('API_ACCESS_TOKEN');

    let data: any;
    {
      // get data from API
      try {
        const url: string = `http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json?auth=${token}&topFinGrpNo=020000&pageNo=${1}`;
        data = (await firstValueFrom(this.httpService.get(url))).data.result;
      } catch (err) {
        console.log(err);
      }
    }

    const savingIdxMap = new Map<string, number>();

    let savingsList: SavingsDTO[] = [];
    {
      // find savingsList
      const baseList: SavingsDTO[] = data.baseList;
      baseList.forEach((savings, idx) => {
        const savingsIdx = idx + 1;
        savingsList.push({
          savings_idx: savingsIdx,
          dcls_month: savings.dcls_month,
          fin_co_no: savings.fin_co_no,
          fin_prdt_cd: savings.fin_prdt_cd,
          kor_co_nm: savings.kor_co_nm,
          fin_prdt_nm: savings.fin_prdt_nm,
          max_limit: savings.max_limit,
        });
        // set map : fin_prdt_cd - {saving_idx}
        savingIdxMap.set(savings.fin_prdt_cd, savingsIdx);
      });
    }

    let optsList: SavingsOptionsDTO[] = [];
    {
      // find savingsList
      const baseList: SavingsOptionsDTO[] = data.optionList;
      baseList.forEach((option) => {
        const savingsIdx = savingIdxMap.get(option.fin_prdt_cd);
        optsList.push({
          fin_prdt_cd: option.fin_prdt_cd,
          intr_rate_type_nm: option.intr_rate_type_nm,
          rsrv_type_nm: option.rsrv_type_nm,
          save_trm: option.save_trm,
          intr_rate: option.intr_rate,
          intr_rate2: option.intr_rate2,
          savings_idx: savingsIdx,
        });
      });
    }
    console.log(optsList[0].savings_idx)
    // save savings + opts
    {
      try {
        await this.savingsRepo.saveSavings(savingsList, optsList);
      } catch (err) {
        console.log(err);
      }
    }

    return data;
  }

  async saveInstallmentSavings() {
    const token = this.configService.get<string>('API_ACCESS_TOKEN');
    const url = `http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json?auth=${token}&topFinGrpNo=020000&pageNo=${1}`;
    const res = await fetch(url);
    const { result }: any = await res.json();
  }

  // 정기예금
  async getSavings() {}

  // 적금
  async getInstallment() {
    // TODO: DB 연동해서 가져오기
  }
}
