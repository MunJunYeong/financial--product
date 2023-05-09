import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from 'libs';
import { firstValueFrom } from 'rxjs';
import {
  SavingsDTO,
  InstallmentDTO,
  SavingsOptionsDTO,
  InstallmentOptionsDTO,
} from './dto/common.dto';
import { SavingsRepo } from './savings.repo';
import { ProductWithOptionDTO } from './dto/service.dto';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고 url = https://finlife.fss.or.kr/finlife/api/fncCoApi/list.do?menuNo=700051

type ProductDTO = SavingsDTO | InstallmentDTO;
type OptDTO = SavingsOptionsDTO | InstallmentOptionsDTO;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class SavingsService {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly httpService: HttpService,
    private readonly savingsRepo: SavingsRepo,
  ) {}

  // api 통신
  private async _getData(url: string) {
    const token = this.configService.get<string>('API_ACCESS_TOKEN');
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${url}?auth=${token}&topFinGrpNo=020000&pageNo=${1}`,
      ),
    );
    return data.result;
  }

  // processing savings
  private _processSavingsData(data: any) {
    const savingIdxMap = new Map<string, number>();

    // find savings list
    let savingsList: SavingsDTO[] = [];
    data.baseList.forEach((savings: SavingsDTO, idx: number) => {
      // set savingsIdx
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

    // find savings option list
    let optsList: SavingsOptionsDTO[] = [];
    data.optionList.forEach((option: SavingsOptionsDTO) => {
      optsList.push({
        fin_prdt_cd: option.fin_prdt_cd,
        intr_rate_type_nm: option.intr_rate_type_nm,
        rsrv_type_nm: option.rsrv_type_nm,
        save_trm: option.save_trm,
        intr_rate: option.intr_rate,
        intr_rate2: option.intr_rate2,
        savings_idx: savingIdxMap.get(option.fin_prdt_cd),
      });
    });

    return { savingsList, optsList };
  }

  // processing installment
  private _processInstallmentData(data: any) {
    const installmentIdxMap = new Map<string, number>();

    let installmentList: InstallmentDTO[] = [];

    // find installment list
    data.baseList.forEach((installment: InstallmentDTO, idx: number) => {
      const installmentIdx = idx + 1;

      installmentList.push({
        installment_idx: installmentIdx,
        dcls_month: installment.dcls_month,
        fin_co_no: installment.fin_co_no,
        fin_prdt_cd: installment.fin_prdt_cd,
        kor_co_nm: installment.kor_co_nm,
        fin_prdt_nm: installment.fin_prdt_nm,
        max_limit: installment.max_limit,
      });

      // set map : fin_prdt_cd - {saving_idx}
      installmentIdxMap.set(installment.fin_prdt_cd, installmentIdx);
    });

    let optsList: InstallmentOptionsDTO[] = [];

    // find installment option List
    data.optionList.forEach((option: InstallmentOptionsDTO) => {
      optsList.push({
        fin_prdt_cd: option.fin_prdt_cd,
        intr_rate_type_nm: option.intr_rate_type_nm,
        save_trm: option.save_trm,
        intr_rate: option.intr_rate,
        intr_rate2: option.intr_rate2,
        installment_idx: installmentIdxMap.get(option.fin_prdt_cd),
      });
    });

    return { installmentList, optsList };
  }

  // processing product with option
  private _processProductData(productData: ProductDTO[], optData: OptDTO[]) {
    let result: ProductWithOptionDTO[] = [];

    for (const product of productData) {
      const opts = optData.filter(
        (opt) => opt.fin_prdt_cd === product.fin_prdt_cd,
      );

      for (const opt of opts) {
        result.push({
          dcls_month: product.dcls_month,
          kor_co_nm: product.kor_co_nm,
          fin_prdt_nm: product.fin_prdt_nm,
          max_limit: product.max_limit,
          intr_rate_type_nm: opt.intr_rate_type_nm,
          rsrv_type_nm: (opt as SavingsOptionsDTO).rsrv_type_nm,
          save_trm: opt.save_trm,
          intr_rate: opt.intr_rate,
          intr_rate2: opt.intr_rate2,
        });
      }
    }
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Savings method

  // Save all
  async SaveSavings() {
    // 1. delete savings + opts
    await this.savingsRepo.DeleteAllSavings();

    // 2. get data
    const savingsData = await this._getData(
      'http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json',
    );

    // 3. processing data
    const savings = this._processSavingsData(savingsData);

    console.log(savings.optsList[0].intr_rate);
    console.log(savings.optsList[3].intr_rate);
    console.log(savings.optsList[5].intr_rate);
    console.log(savings.optsList[7].intr_rate);
    console.log(savings.optsList[9].intr_rate);
    // 4. save data
    await this.savingsRepo.SaveSavings(savings.savingsList, savings.optsList);

    return true;
  }

  // Get all
  async GetSavings(): Promise<ProductWithOptionDTO[]> {
    const savingsData = await this.savingsRepo.GetSavings();
    const optData = await this.savingsRepo.GetSavingsOpts();

    if (!savingsData || !optData) {
      // TODO: error handling 고민해보기
      return null;
    }

    return this._processProductData(savingsData, optData);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Installment method

  // save all
  async SaveInstallmentSavings() {
    // delete installments + opts
    await this.savingsRepo.DeleteAllInstallment();

    // get data 정기예금
    const installmentData = await this._getData(
      'http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json',
    );

    // processing installments, opts
    const installment = this._processInstallmentData(installmentData);

    // save all
    await this.savingsRepo.SaveInstallments(
      installment.installmentList,
      installment.optsList,
    );

    return true;
  }

  async GetInstallment(): Promise<ProductWithOptionDTO[]> {
    const instData = await this.savingsRepo.GetInstallments();
    const optData = await this.savingsRepo.GetInstallmentOpts();

    if (!instData || !optData) {
      // TODO: error handling 고민해보기
      return null;
    }

    return this._processProductData(instData, optData);
  }
}
