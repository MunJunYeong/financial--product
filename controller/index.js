const {getSavings, getInstallmentSavings} = require('../service')

const getSavings = async (req, res)=> {

    await getSavings();
}
const getInstallmentSavings = async (req, res)=> {
    
    await getInstallmentSavings();
}

module.exports = {
    getSavings,
    getInstallmentSavings
}