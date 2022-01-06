const db = require('../db/index')

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
    const {username,password}=req.body
    if(!username||!password){
        return res.send({
            status:1,
            message:'用户名或密码不能为空'
        })
    }
    const sqlStr='select username from users where username=?'
    db.query(sqlStr,[username],(error,result)=>{
        console.log(error,result.length)
        if(error){
            return res.send({
                status:1,
                message:error.message
            })
        }
        if(result.length>0){
            return res.send({
                status:1,
                message:'用户名已存在'
            })
            
        }
    })
    // return res.send({
    //     status: 0,
    //     message:'注册成功'
    //   });
}