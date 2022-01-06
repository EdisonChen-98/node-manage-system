const express = require('express')
const router = express.Router()
const router_handler=require('../router_handler/common')

router.post('/login',router_handler.login)
router.post('/register',router_handler.register)

module.exports=router