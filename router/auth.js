/*
 * @Author: Edison Chen
 * @Date: 2022-01-06 16:56:02
 */
const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    res.send({
        status: 0,
        data: {
            username: req.body.account,
            password: req.body.password
        }
    });
})

module.exports = router