/*
 * @Author: Edison Chen
 * @Date: 2022-01-06 16:56:02
 */
const express = require('express')
const router = express.Router()
const router_handler = require('../router_handler/auth')
router.get('/getUserInfo', router_handler.getUserInfo)
router.post('/updateUserInfo', router_handler.updateUserInfo)

module.exports = router