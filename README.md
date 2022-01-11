# node_server

## 关于
外卖商户后台管理平台的后端部分，基于express，配合前端项目食用：[前端项目地址](https://github.com/EdisonChen-98/vue-manage-system)

## 技术栈
前端: vue 2 + element-ui + axios + ES6  
后端: nodejs + express + mysql  

## 模块
已完成：登录注册模块，用户信息模块，token鉴权
正在做: 商铺模块

## 项目运行
```
确保安装了mysql并启动
db/index.js修改本地数据库配置
db/tableData文件夹下的cvs数据文件导入到mysql
```
```
git clone https://github.com/EdisonChen-98/node-manage-system.git
npm install
nodemon ./app.js
```

