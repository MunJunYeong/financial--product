const {getSavings, getInstallmentSavings} = require('../service')

const savingsList = async (req, res)=> {

    await getSavings();
    res.send("aa")
}
const installmentSavingsList = async (req, res)=> {
    
    await getInstallmentSavings();
}

module.exports = {
    savingsList,
    installmentSavingsList
}