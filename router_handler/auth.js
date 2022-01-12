/*
 * @Author: Edison Chen
 * @Date: 2022-01-11 09:46:38
 */
const db = require('../db/index')

exports.getUserInfo = (req, res) => {
    const { user: { id } } = req
    const selectSql = 'select id, username, gender, email from users where id=?'
    db.query(selectSql, [id], (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        if (result.length != 1) {
            return res.sendInfo('系统错误')
        }
        const data = { ...result[0] }
        return res.send({
            status: 0,
            data
        })
    })
}

exports.updateUserInfo = (req, res) => {
    const { user: { id } } = req
    const { body: { email, gender } } = req
    const sql = 'update users set ? where id=?'
    db.query(sql, [{ email, gender }, id], (error, result) => {
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

exports.getAllShop = (req, res) => {
    const sql = 'select * from shops'
    db.query(sql, (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        return res.send({
            status: 0,
            data: {
                list: result,
                total: result.length
            }
        })
    })
}