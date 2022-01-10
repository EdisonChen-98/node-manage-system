/*
 * @Author: Edison Chen
 * @Date: 2022-01-10 09:21:30
 */
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecretKey } = require('../config')

exports.login = (req, res) => {
    let { username, password } = req.body
    const selectSql = 'select * from users where username=?'
    db.query(selectSql, [username], (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        if (result.length != 1) {
            return res.sendInfo('账户未注册，请先注册')
        }
        const pwdIsRight = bcrypt.compareSync(password, result[0].password)
        if (!pwdIsRight) {
            return res.sendInfo('密码错误')
        }
        const tokenInfo = { ...result[0], password: '', user_pic: '' }
        const token = jwt.sign(tokenInfo, jwtSecretKey, {
            expiresIn: '10000ms'
        })
        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + token
        })
    })

}

exports.register = (req, res) => {
    let { username, password } = req.body
    const selectSql = 'select username from users where username=?'
    db.query(selectSql, [username], (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        if (result.length > 0) {
            return res.sendInfo('用户名被占用，请更换其他用户名')
        }
        password = bcrypt.hashSync(password, 10)
        const insertSql = 'insert into users set ?'
        db.query(insertSql, [{ username, password }], (error, result) => {
            if (error) {
                return res.sendInfo(error)
            }
            if (result.affectedRows != 1) {
                return res.sendInfo('注册用户失败。请稍后再试')
            }
            res.send({
                status: 0,
                message: '注册成功'
            });
        })
    })
}