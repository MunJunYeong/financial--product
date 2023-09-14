import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommonService, ConfigurationService } from 'libs';
import { firstValueFrom } from 'rxjs';
import { SavingsDTO, InstallmentDTO, SavingsOptionsDTO, InstallmentOptionsDTO } from './dto/common.dto';
import { SavingsRepo } from './savings.repo';
import { ProductWithOptionDTO } from './dto/service.dto';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고 url = https://finlife.fss.or.kr/finlife/api/fncCoApi/list.do?menuNo=700051

type ProductDTO = SavingsDTO | InstallmentDTO;
type ProductOptDTO = SavingsOptionsDTO | InstallmentOptionsDTO;

const _savingsType: string = 'savings';
const _installmentType: string = 'installment';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class SavingsService {
    constructor(
        private readonly configService: ConfigurationService,
        private readonly httpService: HttpService,
        private readonly savingsRepo: SavingsRepo,
        private readonly commonService: CommonService,
    ) {}

    // api 통신
    private async _getData(url: string) {
        const token = this.configService.get<string>('API_ACCESS_TOKEN');
        let res: any;
        try {
            const { data } = await firstValueFrom(
                this.httpService.get(`${url}?auth=${token}&topFinGrpNo=020000&pageNo=${1}`),
            );
            res = data.result;
        } catch (err) {
            throw err;
        }

        return res;
    }

    // process product for saving data
    private _processProduct(
        productData: ProductDTO[],
        optData: ProductOptDTO[],
        type: string,
    ): { productList: ProductDTO[]; optsList: ProductOptDTO[] } {
        // set map
        const idxMap = new Map<string, number>();

        let productList: ProductDTO[] = [];
        // find installment list
        productData.forEach((product: ProductDTO, idx: number) => {
            const productIdx = idx + 1;

            let tempProduct: ProductDTO = {
                ...product,
            };

            switch (type) {
                case _savingsType:
                    tempProduct['savings_idx'] = productIdx;
                case _installmentType:
                    tempProduct['installment_idx'] = productIdx;
            }
            productList.push(tempProduct);

            // set map : fin_prdt_cd - {saving_idx}
            idxMap.set(product.fin_prdt_cd, productIdx);
        });

        let optsList: ProductOptDTO[] = [];
        // find installment option List
        optData.forEach((option: ProductOptDTO) => {
            const idx = idxMap.get(option.fin_prdt_cd);

            let tempOpt: ProductOptDTO = {
                ...option,
            };
            switch (type) {
                case _savingsType:
                    tempOpt['savings_idx'] = idx;
                case _installmentType:
                    tempOpt['installment_idx'] = idx;
            }
            optsList.push(tempOpt);
        });
        return { productList, optsList };
    }

    // processing product for get data
    private _processProductWithOption(productData: ProductDTO[], optData: ProductOptDTO[]) {
        let result: ProductWithOptionDTO[] = [];

        for (const product of productData) {
            const opts = optData.filter((opt) => opt.fin_prdt_cd === product.fin_prdt_cd);

            for (const opt of opts) {
                result.push({
                    dcls_month: product.dcls_month,
                    kor_co_nm: product.kor_co_nm,
                    fin_prdt_nm: product.fin_prdt_nm,
                    fin_prdt_cd: product.fin_prdt_cd,
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
        let savingsData: any;
        try {
            // 1. delete savings + opts
            await this.savingsRepo.DeleteAllSavings();

            // 2. get data
            savingsData = await this._getData('http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json');
        } catch (err) {
            throw new HttpException(
                {
                    message: this.commonService.Errors.FETCH_SAVINGS,
                    error: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        // 3. processing data
        const savings: SavingsDTO[] = savingsData.baseList;
        const opts: SavingsOptionsDTO[] = savingsData.optionList;
        const result = this._processProduct(savings, opts, _savingsType);

        // 4. save data
        try {
            await this.savingsRepo.SaveSavings(
                result.productList as SavingsDTO[],
                result.optsList as SavingsOptionsDTO[],
            );
        } catch (err) {
            throw new HttpException(
                {
                    message: this.commonService.Errors.DB_SAVE_SAVINGS,
                    error: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return true;
    }

    // get best savings
    async GetBestSavings(): Promise<ProductWithOptionDTO[]> {
        // get savings data
        let savingsData: ProductWithOptionDTO[];
        try {
            savingsData = await this.GetSavings();
        } catch (err) {
            throw new HttpException(
                {
                    message: this.commonService.Errors.DB_GET_SAVINGS,
                    error: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        // Map data by product name and pick the one with the highest intr_rate2
        const bestProducts: { [key: string]: ProductWithOptionDTO } = {};

        for (let product of savingsData) {
            if (
                !bestProducts[product.fin_prdt_nm] ||
                parseFloat(product.intr_rate2) > parseFloat(bestProducts[product.fin_prdt_nm].intr_rate2)
            ) {
                bestProducts[product.fin_prdt_nm] = product;
            }
        }

        // Convert mapped object back to an array
        const result: ProductWithOptionDTO[] = Object.values(bestProducts);

        return result;
    }

    async GetDetailSavings(prodCode: string): Promise<ProductWithOptionDTO[]> {
        // get savings data
        let savingsData: ProductWithOptionDTO[];
        try {
            savingsData = await this.GetSavings();
        } catch (err) {
            throw new HttpException(
                {
                    message: this.commonService.Errors.DB_GET_SAVINGS,
                    error: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const detailProducts: ProductWithOptionDTO[] = [];
        for (const product of savingsData) {
            if (product.fin_prdt_cd === prodCode) {
                detailProducts.push(product);
            }
        }
        return detailProducts;
    }

    // Get all
    async GetSavings(): Promise<ProductWithOptionDTO[]> {
        let savingsData: SavingsDTO[];
        let optData: SavingsOptionsDTO[];
        try {
            savingsData = await this.savingsRepo.GetSavings();
            optData = await this.savingsRepo.GetSavingsOpts();
        } catch (err) {
            throw new HttpException(
                {
                    message: this.commonService.Errors.DB_GET_SAVINGS,
                    error: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        if (!savingsData || !optData) {
            // TODO: error handling
            return null;
        }

        return this._processProductWithOption(savingsData, optData);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Installment method

    // save all
    async SaveInstallments(): Promise<Boolean> {
        // delete installments + opts
        await this.savingsRepo.DeleteAllInstallment();

        // get data 정기예금
        let installmentData: any;
        try {
            installmentData = await this._getData('http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json');
        } catch (err) {
            throw new HttpException(
                {
                    message: this.commonService.Errors.FETCH_INSTALLMENT,
                    error: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        // 3. processing data
        const installments: InstallmentDTO[] = installmentData.baseList;
        const opts: InstallmentOptionsDTO[] = installmentData.optionList;
        const installment = this._processProduct(installments, opts, _installmentType);

        try {
            // save all
            await this.savingsRepo.SaveInstallments(
                installment.productList as InstallmentDTO[],
                installment.optsList as InstallmentOptionsDTO[],
            );
        } catch (err) {
            throw new HttpException(
                {
                    message: this.commonService.Errors.DB_SAVE_INSTALLMENT,
                    error: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return true;
    }

    // get best installments
    async GetBestInstallments(): Promise<ProductWithOptionDTO[]> {
        // get installments data
        let installmentData: ProductWithOptionDTO[];
        try {
            installmentData = await this.GetInstallment();
        } catch (err) {
            throw new HttpException(
                {
                    message: this.commonService.Errors.DB_GET_INSTALLMENT,
                    error: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        // Map data by product name and pick the one with the highest intr_rate2
        const bestProducts: { [key: string]: ProductWithOptionDTO } = {};

        for (let product of installmentData) {
            if (
                !bestProducts[product.fin_prdt_nm] ||
                parseFloat(product.intr_rate2) > parseFloat(bestProducts[product.fin_prdt_nm].intr_rate2)
            ) {
                bestProducts[product.fin_prdt_nm] = product;
            }
        }

        // Convert mapped object back to an array
        const result: ProductWithOptionDTO[] = Object.values(bestProducts);

        return result;
    }

    async GetDetailInstallments(prodCode: string): Promise<ProductWithOptionDTO[]> {
        let installmentData: ProductWithOptionDTO[];
        try {
            installmentData = await this.GetInstallment();
        } catch (err) {
            throw new HttpException(
                {
                    message: this.commonService.Errors.DB_GET_INSTALLMENT,
                    error: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const detailProducts: ProductWithOptionDTO[] = [];
        for (const product of installmentData) {
            if (product.fin_prdt_cd === prodCode) {
                detailProducts.push(product);
            }
        }
        return detailProducts;
    }

    async GetInstallment(): Promise<ProductWithOptionDTO[]> {
        let instData: InstallmentDTO[];
        let optData: InstallmentOptionsDTO[];
        try {
            instData = await this.savingsRepo.GetInstallments();
            optData = await this.savingsRepo.GetInstallmentOpts();
        } catch (err) {
            throw new HttpException(
                {
                    message: this.commonService.Errors.DB_GET_INSTALLMENT,
                    error: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        if (!instData || !optData) {
            // TODO: error handling 고민해보기
            return null;
        }

        return this._processProductWithOption(instData, optData);
    }
}
