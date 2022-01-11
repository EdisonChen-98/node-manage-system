/*
 * @Author: Edison Chen
 * @Date: 2022-01-11 09:46:38
 */
const db = require('../db/index')

exports.getUserInfo = (req, res) => {
    const { user: { username } } = req
    const selectSql = 'select * from users where username=?'
    db.query(selectSql, [username], (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        if (result.length != 1) {
            return res.sendInfo('系统错误')
        }
        const data = { ...result[0], password: '' }
        return res.send({
            status: 0,
            data
        })
    })
}

exports.updateUserInfo = (req, res) => {
    const { user: { username } } = req
    const { body } = req
    const sql = 'update users set? where username=?'
    db.query(sql, [body, username], (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        if (result.affectedRows != 1) {
            return res.sendInfo('更新用户信息失败,请稍后再试')
        }
        return res.send({
            status: 0,
            message: '更新成功'
        })
    })
}