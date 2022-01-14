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
const { add_myShop_rule } = require('../rules/shop')

router.get('/getUserInfo', router_handler.getUserInfo)
router.post('/updateUserInfo', expressJoi(update_userInfo_rule), router_handler.updateUserInfo)
router.post('/getAllShopList', router_handler.getAllShopList)
router.post('/getMyShopList', router_handler.getMyShopList)
router.post('/addMyShop', expressJoi(add_myShop_rule), router_handler.addMyShop)
router.post('/deleteMyShop', router_handler.deleteMyShop)
router.post('/getMyShopDetail', router_handler.getMyShopDetail)
router.post('/editMyShop', router_handler.editMyShop)



module.exports = router