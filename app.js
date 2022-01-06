/*
 * @Author: Edison Chen
 * @Date: 2022-01-06 10:03:02
 */
const express = require('express')
const app = express()

//中间件
app.use(express.json()) // 解析 application/json
app.use(express.urlencoded({ extended: true })) // 解析 application/x-www-form-urlencoded


//路由模块
const authRouter = require('./router/auth')
app.use('/auth',authRouter)

//启动服务
app.listen(3007, () => {
  console.log('server running at http:127.0.0.1:3007');
})