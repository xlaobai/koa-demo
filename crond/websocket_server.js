const config = require('../config/config');
const Koa = require('koa');
const route = require('koa-route');
const websockify = require('koa-websocket');
const app = websockify(new Koa());

app.ws.use(route.all('/huobi', (ctx) => {
    
    let onOff = true;

    ctx.websocket.on('message', async(msg) => {

        setTimeout( function() {            
            if (onOff && msg) {                                 //判断客户端数据和开关状态
                ctx.websocket.send(`xlaobai`);                 //断了的时候，异步定时器还没走完，所以会报Error: WebSocket is not open: readyState 3 (CLOSED)问题

                setTimeout(arguments.callee, 1000);
            } else {
                console.log(1);
            }
        }, 1000);
    });
    
    ctx.websocket.on('close',  async() => {
        onOff = false;
        console.log('close');
    });
}));


app.listen(12000, () => {
    console.log("You WS Hade been started!");
});
