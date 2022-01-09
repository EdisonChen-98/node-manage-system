/*
 * @Author: Edison Chen
 * @Date: 2022-01-06 10:03:02
 */
const express = require('express')
const joi = require('joi')
const app = express()

//中间件
app.use(express.json()) // 解析 application/json
app.use(express.urlencoded({ extended: true })) // 解析 application/x-www-form-urlencoded
app.use((req,res,next)=>{
  res.sendInfo=(error,status=1)=>{
    res.send({
      status,
      message:error instanceof Error?error.message:error
    })
  }
  next()
})


//路由模块
const commonRouter = require('./router/common')
app.use('/common',commonRouter)

//错误级别中间件
app.use((error,req,res,next)=>{
  if(error instanceof joi.ValidationError){
    return res.sendInfo(error)
  }
  res.sendInfo(error)
})

//启动服务
app.listen(3007, () => {
  console.log('server running at http:127.0.0.1:3007');
})