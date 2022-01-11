const joi = require("joi")

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().max(20).required()
const email = joi.string().email()
const gender = joi.number().integer().min(0).max(1)

exports.reg_login_rule = {
    body: {
        username, password
    }
}
exports.update_userInfo_rule = {
    body: {
        email, gender
    }
}