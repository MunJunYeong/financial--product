const express = require('express')
const router = express.Router()
const {getSavings, getInstallmentSavings} = require('../controller')

router.get('/test', getSavings)

module.exports = router