
const token = process.env.API_ACCESS_TOKEN

// 정기예금
const _getSavings = async ()=> {
    const url = `http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json?auth=${token}&topFinGrpNo=020000&pageNo=${1}`
}

// 적금
const _getInstallmentSavings = async ()=> {

}



const getSavings = async ()=> {

}
const getInstallmentSavings = async ()=> {

}

module.exports = {
    getSavings,
    getInstallmentSavings
}
 

