const joi = require("joi")

const username=joi.string().alphanum().min(1).max(10).required()
const password=joi.string().max(20).required()
const confirmPassword=joi.string().max(20).required()

 exports.reg_login_rule={
     body:{
         username,password,confirmPassword
     }
 }