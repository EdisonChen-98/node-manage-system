/*
 * @Author: Edison Chen
 * @Date: 2022-01-06 10:03:02
 */
const express = require('express')
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/auth/login', function (req, res) {
  console.log('login', req.body)
  res.send({
    status: 0,
    data: {
      username: req.body.username,
      password: req.body.password
    }
  });
});
app.listen(3007, () => {
  console.log('server running at http:127.0.0.1:3007');
})