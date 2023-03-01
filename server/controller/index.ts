import {getSavings, getInstallmentSavings} from '../service'

const savingsList = async (req: any, res: any)=> {

    await getSavings();
    res.send("aa")
}
const installmentSavingsList = async (req: any, res: any)=> {
    
    await getInstallmentSavings();
}

export {
    savingsList,
    installmentSavingsList
}
