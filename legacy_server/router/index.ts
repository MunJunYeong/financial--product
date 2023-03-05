import express from 'express';
import {savingsList, installmentSavingsList} from '../controller'
const router = express.Router();

router.get('/savings', savingsList)
router.get('/installment/savings', installmentSavingsList)

export default router;