const express = require('express')
const router = express.Router()
const {savingsList, installmentSavingsList} = require('../controller')

router.get('/savings', savingsList)
router.get('/installment/savings', installmentSavingsList)

module.exports = router