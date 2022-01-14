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

exports.getAllShopList = (req, res) => {
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

exports.getMyShopList = (req, res) => {
    const { id } = req.user
    const { pageSize, pageNum, keyword } = req.body
    const { offset, count } = req.makeOffset(pageSize, pageNum)
    const sql = `select id, shopName, category, score, userId from shops where userId =? ${keyword ? `and shopName like '%${keyword}%' ` : ''}order by operationTime desc limit ?, ?`
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
    const { body: { shopName, category }, operationTime } = req
    const { id: userId } = req.user
    const insertSql = 'insert into shops set ?'
    db.query(insertSql, [{ shopName, category, userId, operationTime }], (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        if (result.affectedRows != 1) {
            return res.sendInfo('添加店铺失败,请稍后再试')
        }
        return res.sendInfo('添加店铺成功', 0)
    })
}

exports.deleteMyShop = (req, res) => {
    const { body: { id } } = req
    const deleteSql = 'delete from shops where id=?'
    db.query(deleteSql, [id], (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        if (result.affectedRows != 1) {
            return res.sendInfo('删除店铺失败,请稍后再试')
        }
        return res.sendInfo('删除店铺成功', 0)
    })
}

exports.getMyShopDetail = (req, res) => {
    const { body: { id } } = req
    const deleteSql = 'select shopName,category, userId from shops where id=?'
    db.query(deleteSql, [id], (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        if (result.length != 1) {
            return res.sendInfo('系统错误')
        }
        return res.send({
            status: 0,
            data: result[0]
        })
    })
}

exports.editMyShop = (req, res) => {
    const { body: { shopName, category, shopId }, operationTime } = req
    const updateSql = 'update shops set ? where id=?'
    db.query(updateSql, [{ shopName, category, operationTime }, shopId], (error, result) => {
        if (error) {
            return res.sendInfo(error)
        }
        if (result.affectedRows != 1) {
            return res.sendInfo('编辑店铺失败,请稍后再试')
        }
        return res.sendInfo('编辑店铺成功', 0)
    })
}