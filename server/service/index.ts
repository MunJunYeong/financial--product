import fetch from 'node-fetch';
const token = process.env.API_ACCESS_TOKEN;

// 참고 url = http://finlife.fss.or.kr/PageLink.do?link=openapi/detail03&menuId=2000127

// 정기예금
const _getSavings = async ()=> {
    const url = `http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json?auth=${token}&topFinGrpNo=020000&pageNo=${1}`
    const res = await fetch(url);
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

}

// 적금
const _getInstallmentSavings = async ()=> {
    const url = `http://finlife.fss.or.kr/finlifeapi/savingProductsSearch.json?auth=${token}&topFinGrpNo=020000&pageNo=${1}`
    const res = await fetch(url);
    const {result}: any = await res.json();
}

const getSavings = async ()=> {
    await _getSavings()
}

const getInstallmentSavings = async ()=> {
    await _getInstallmentSavings()
}

export {
    getSavings,
    getInstallmentSavings
}