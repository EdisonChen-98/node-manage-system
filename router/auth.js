/*
 * @Author: Edison Chen
 * @Date: 2022-01-06 16:56:02
 */
//auth需要权限的接口路由
const express = require('express')
const router = express.Router()
const router_handler = require('../router_handler/auth')
const expressJoi = require('@escook/express-joi')
const { update_userInfo_rule } = require('../rules/user')

router.get('/getUserInfo', router_handler.getUserInfo)
router.post('/updateUserInfo', expressJoi(update_userInfo_rule), router_handler.updateUserInfo)
router.get('/getAllShop', router_handler.getAllShop)

module.exports = router