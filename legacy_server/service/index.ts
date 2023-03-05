import fetch from 'node-fetch';
const token = process.env.API_ACCESS_TOKEN;

// 참고 url = http://finlife.fss.or.kr/PageLink.do?link=openapi/detail03&menuId=2000127

interface product {
    dcls_month: string // 시작일
    fin_prdt_cd: string // product pk
    kor_co_nm: string // bank
    fin_prdt_nm: string // prdt name
    options: option[]
}
interface option{
    save_trm: number // month
    intr_rate: number // 저축금리
    intr_rate2: number // 최고금리
}

// 정기예금
const _getSavings = async ()=> {
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
    
    
    console.log(result.baseList.length)
    console.log(result.optionList.length)
    console.log(result.baseList[0]);
    console.log(result.optionList[0]);
    console.log(result.optionList[1]);
    console.log(result.optionList[2]);
    return result;
}

// 적금
const _getInstallmentSavings = async ()=> {
    const url = `http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json?auth=${token}&topFinGrpNo=020000&pageNo=${1}`
    const res = await fetch(url);
    const {result}: any = await res.json();
}

const getSavings = async ()=> {
    return await _getSavings()
}

const getInstallmentSavings = async ()=> {
    await _getInstallmentSavings()
}

export {
    getSavings,
    getInstallmentSavings
}