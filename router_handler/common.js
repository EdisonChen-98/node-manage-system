const db = require('../db/index')
const bcrypt=require('bcryptjs')

exports.login=(req,res)=>{
    res.send({
        status: 0,
        data: {
          username: req.body.username,
          password: req.body.password
        }
      });
}

exports.register=(req,res)=>{
    let {username,password}=req.body
    if(!username||!password){
        return req.sendError('用户名或密码不能为空')
    }
    const selectSql='select username from users where username=?'
    db.query(selectSql,[username],(error,result)=>{
        if (error) {
            return req.sendError(error)
        }
        if(result.length>0){
            return req.sendError('用户名被占用，请更换其他用户名')
        }
        password=bcrypt.hashSync(password,10)
        const insertSql='insert into users set ?'
        db.query(insertSql,[{username,password}],(error,result)=>{
            if(error){
                return req.sendError(error)
            }
            if(result.affectedRows !=1){
                return req.sendError('注册用户失败。请稍后再试')
            }
            res.send({
                status: 0,
                message:'注册成功'
              });
        })
    })
}