/**
 * koa架构服务端框架
 *  koa主要优化了node-http部分的功能
 *  框架主以中间件的形式引入所需部分
 * 
 * @author xlaobai
 * @date = 2018-5-23 
 */

//node内置
const fs = require('fs');

//引入koa框架
const Koa = require('koa');
var app = new Koa();

//引入全局配置文件
const config = require('../config/config');

//中间件的引入
const koaBady = require('koa-body');            //解析formdata
const static = require('koa-static');           //static静态文件目录，用于直接连接css,js,img
const views = require('koa-views');             //view视图中间件,引入ejs模板渲染
const logger = require('koa-logger');           //日志中间件
const helmet = require('koa-helmet');
const session = require('koa-session');
app.use(koaBady({multipart : true}))
    .use(static(`${__dirname}/static`))
    .use(views(`${config.vie}`, {
        extension : 'ejs'
    }))
    .use(logger())
    .use(helmet());
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));


//路由的分离
var router = require(`${config.app}/routers.js`);
app.use(router.routes())
    .use(router.allowedMethods());      //丰富路由

//测试端口
app.listen(3000, ()=>{
    console.log("You Server Hade been started!");   
})