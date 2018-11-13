const Redis = require('ioredis');
var ioredis = new Redis({
    port: 6379,          
    host: '127.0.0.1',  
});

module.exports = ioredis;
