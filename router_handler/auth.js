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
    const { pageSize, pageNum } = req.body
    const { offset, count } = req.makeOffset(pageSize, pageNum)
    const sql = 'select id, shopName, category, score from shops limit ?, ?'
    db.query(sql, [offset, count], (listError, listResult) => {
        if (listError) {
            return res.sendInfo(listError)
        }
        const totalSql = 'select count(*) from shops'
        db.query(totalSql, (totalError, totalResult) => {
            if (totalError) {
                return res.sendInfo(totalError)
            }
            return res.send({
                status: 0,
                data: {
                    list: listResult,
                    total: totalResult[0]['count(*)']
                }
            })
        })
    })
}

exports.getMyShop = (req, res) => {
    const { id } = req.user
    const { pageSize, pageNum } = req.body
    const { offset, count } = req.makeOffset(pageSize, pageNum)
    const sql = 'select id, shopName, category, score, userId from shops where userId =? limit ?, ?'
    db.query(sql, [id, offset, count], (listError, listResult) => {
        if (listError) {
            return res.sendInfo(listError)
        }
        const totalSql = 'select count(*) from shops where userId =?'
        db.query(totalSql, id, (totalError, totalResult) => {
            if (totalError) {
                return res.sendInfo(totalError)
            }
            return res.send({
                status: 0,
                data: {
                    list: listResult,
                    total: totalResult[0]['count(*)']
                }
            })
        })
    })
}

exports.addMyShop = (req, res) => {
    const { shopName, category } = req.body
    const { id: userId } = req.user
    const insertSql = 'insert into shops set ?'
    db.query(insertSql, [{ shopName, category, userId }], (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        if (result.affectedRows != 1) {
            return res.sendInfo('添加店铺失败,请稍后再试')
        }
        return res.sendInfo('添加店铺成功', 0)
    })
}