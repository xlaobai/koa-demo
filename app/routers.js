/**
 * 路由文件
 * 调用控制器，返回状态
 */

//路由对象
const Router = require('koa-router');
const Back = require('./controller/back');
var router = new Router();        
var back = new Back();

router.get('/test_get', async (ctx)=>{
    let res = await back.getDate(ctx.request);
    ctx.body = res; 
})

router.post('/test_post', async (ctx)=>{
    let res = await back.postData(ctx.request);
    ctx.body = res; 
})

router.get('/index', async (ctx) => {
    if( !ctx.session.username ){
        //跳转登录页
    }
    await ctx.render('index/index', {
        username : "xlaobai",
        uid : 1
    })   
})

module.exports = router;
