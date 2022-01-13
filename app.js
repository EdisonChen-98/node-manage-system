/*
 * @Author: Edison Chen
 * @Date: 2022-01-06 10:03:02
 */
const express = require('express')
const joi = require('joi')
const expressJWT = require('express-jwt')
const { jwtSecretKey } = require('./config')
const app = express()

//中间件
app.use(express.json()) // 解析 application/json
app.use(express.urlencoded({ extended: true })) // 解析 application/x-www-form-urlencoded
app.use((req, res, next) => {
  res.sendInfo = (error, status = 1) => {
    res.send({
      status,
      message: error instanceof Error ? error.message : error
    })
  }
  next()
})
app.use((req, res, next) => {
  req.makeOffset = (pageSize, pageNum) => {
    const offset = (pageNum - 1) * pageSize
    const count = pageSize
    return { offset, count }
  }
  next()
})
app.use(expressJWT({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/common\//] })) //解析 token



//路由模块
const commonRouter = require('./router/common')
const authRouter = require('./router/auth')
app.use('/common', commonRouter)
app.use('/auth', authRouter)

//错误级别中间件
app.use((error, req, res, next) => {
  if (error instanceof joi.ValidationError) {
    return res.sendInfo(error)
  }
  if (error.name === 'UnauthorizedError') {
    return res.sendInfo('身份认证失败,请重新登录')
  }
  res.sendInfo(error)
})

//启动服务
app.listen(3007, () => {
  console.log('server running at http:127.0.0.1:3007');
})