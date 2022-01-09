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
    console.log('+++',req.body);
    let {username,password,confirmPassword}=req.body
    if(password!=confirmPassword){
        return res.sendError('两次输入密码不一致')
    }
    const selectSql='select username from users where username=?'
    db.query(selectSql,[username],(error,result)=>{
        if (error) {
            return res.sendError(error)
        }
        if(result.length>0){
            return res.sendError('用户名被占用，请更换其他用户名')
        }
        password=bcrypt.hashSync(password,10)
        const insertSql='insert into users set ?'
        db.query(insertSql,[{username,password}],(error,result)=>{
            if(error){
                return res.sendError(error)
            }
            if(result.affectedRows !=1){
                return res.sendError('注册用户失败。请稍后再试')
            }
            res.send({
                status: 0,
                message:'注册成功'
              });
        })
    })
}