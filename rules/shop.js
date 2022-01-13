/*
 * @Author: Edison Chen
 * @Date: 2022-01-13 14:30:20
 */
//前端数据校验规则,生成对应的局部中间件
const joi = require("joi")

const shopName = joi.string().min(1).max(10).required()
const category = joi.string().required()


exports.add_myShop_rule = {
    body: {
        shopName, category
    }
}
