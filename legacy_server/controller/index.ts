import {getSavings, getInstallmentSavings} from '../service'

const savingsList = async (req: any, res: any)=> {
    res.send(await getSavings())
}
const installmentSavingsList = async (req: any, res: any)=> {
    
    await getInstallmentSavings();
}

export {
    savingsList,
    installmentSavingsList
}
