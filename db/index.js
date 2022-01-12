const mysql = require('mysql')
//配置并连接数据库
const db = mysql.createPool({
    host: '127.0.0.1', //连接本地数据库
    user: 'root', //mysql用户名
    password: 'admin123', //mysql密码
    database: 'node_db_01', //数据库名
})

module.exports = db