
exports.getUserInfo = (req, res) => {
    console.log('+++', req.user);
    res.send({
        status: 0,
        message: '用户信息'
    })
}