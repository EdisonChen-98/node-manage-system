const express = require('express')
const app=express()


app.get('/test', function(req, res){
    res.send('hello world');
  });
app.listen(3007,()=>{
    console.log('server running at http:127.0.0.1:3007');
})