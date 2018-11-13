const config = __dirname; 
const root = `${__dirname}/..`;
const app = `${root}/app`;
const crond = `${root}/crond`; 
const model = `${app}/model`; 
const controller = `${app}/controller`; 
const views = `${app}/views`;
const library = `${app}/library`;
const public = `${root}/public`;
const static = `${public}/static`;
const storage = `${root}/storage`;
const logs = `${storage}/logs`;
const cache = `${storage}/cache`;
const pem = `${__dirname}/pem`;

module.exports = {
    'conf': config,
    'rot' : root,
    'app' : app,
    'cro' : crond,
    'mod' : model,
    'ctl' : controller,
    'vie' : views,
    'lib' : library,
    'pub' : public,
    'sta' : static,
    'log' : logs,
    'cat' : cache,
    'pem' : pem,
    'site' : 'http://test.ctp.com',
}