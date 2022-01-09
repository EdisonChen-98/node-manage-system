const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {reg_login_rule} = require('../rules/user')
const router_handler=require('../router_handler/common')

router.post('/login',expressJoi(reg_login_rule),router_handler.login)
router.post('/register',expressJoi(reg_login_rule),router_handler.register)

module.exports=router