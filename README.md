# 说明文档

### 文件夹说明
* app *网站源码*
    * controller *控制器*
    * library *通用类*
    * model *数据模型*
    * view *视图*
    * route.php *路由文件*
* config *网站配置*
    * config.js *网站配置*
    * mysql.js *数据库配置*
    * redis.js *缓存配置*
    * php_text.sql *sql文件*
* crond *自动脚本*
    * websocket_server.js *websocket服务器*
* public *对外文件*（网站入口/静态文件）
* node_modules *引入npm包* （初始化后自动生成）
* pm2.json *pm2启动文件,包括二个node进程*

## 准备工作
1. 初始化组件：在项目跟目录运行以下命令

    ```
    npm install
    ```

2. 安装pm2，运行
    
    ```
    pm2 start pm2.json
    ```