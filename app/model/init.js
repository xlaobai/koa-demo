const config = require('../../config/config');
const pool = require(`${config.conf}/mysql`);

class Init {
    constructor() {
        
    }
    
    //基本语句
    query(sql) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if(err) {
                    reject(err);
                } else {
                    conn.query(sql, (qerr, vals, fields) => {
                        conn.release();
                        resolve(vals);
                    })
                }
            })
        })
    }

    write(sql, d){
		return new Promise((resolve,reject) => {
			pool.getConnection((err, conn) => {
				if(err){
					reject(err);
				}else{
					conn.query(sql,d,(qerr, vals, fields) => {
						//释放连接
						conn.release();
						//事件驱动回调
						resolve(vals);
					});
				}
			});
		})
	}

    //深度操作
    delete(table, cond) {
        return new Promise( async(resolve, reject) => {
            let condStr = [];
            for( let key in cond ) {
                condStr.push(`${key} = ${cond[key]}`);                
            }
            let sql = `DELETE FROM ${table} WHERE ${condStr.join(',')}`;
            let len = await this.query(sql);
            if(!len.affectedRows) {
                resolve(0);         
            } else {
                resolve(1);
            }
        })
    }

    insert(arr, table) {
        return new Promise( async(resolve, reject) => {
            let name = [];
            let str = [];
            let val = [];
            for(let key in arr ) {
                name.push(key);
                str.push('?');
                val.push(arr[key]);
            }
            let nameStr = name.join(',');
            let valStr = str.join(',');
            let addSql = `INSERT INTO ${table} ( ${nameStr} ) VALUES ( ${valStr} )`;
            let len = await this.write(addSql, val);
            if(!len.affectedRows) {
                resolve(0);
            } else {
                resolve(len.insertId);                
            }
        })
    }

    update(arr, table, cond) {
        return new Promise( async(resolve, reject) => {
            let str = [];
            let val = [];
            for( let key in arr ) {
                str.push(`${key} = ?`);
                val.push(arr[key]);                
            }
            let condStr = [];
            for( let key in cond ) {
                condStr.push(`${key} = ${cond[key]}`);                
            }
            let sql = `UPDATE ${table} SET ${str.join(',')} WHERE ${condStr.join(',')}`;
            let len = await this.write(sql, val);
            if(len) {
                resolve(1);         
            } else {
                resolve(0);
            }
        })
    }

    /**
     * 两表查询 string
     * table_a 为主表
     * table_b 为副表
     * filed 为字段,头部需拼接ab表名
     * cond 为添加
    */
   //根据字段一元查询
    async find(arr, table) {
        let str = [];
        let val = [];
        for(let key in arr ) {
            let cond = `${key} = ?`;
            str.push(cond);
            val.push(arr[key]);
        }
        
        let selSql = `select * from ${table} where ${str.join(' and ')}`;
        let res =  await this.write(selSql, val);
        if(!res.length) {
            return 0;
        } else {
            return res;
        }
    }

    async findConn(filed, cond, table_a, table_b) {
        let sql = `SELECT ${filed} FROM ${table_a} as a, ${table_b} as b WHERE ${cond}`;
        let res = await this.query(sql);
        if(!res.length) {
            return 0;
        } else {
            return res;
        }
    }

    async findThConn(filed, cond, table_a, table_b, table_c) {
        let sql = `SELECT ${filed} FROM ${table_a} as a, ${table_b} as b, ${table_c} as c WHERE ${cond}`;
        let res = await this.query(sql);
        if(!res.length) {
            return 0;
        } else {
            return res;
        }
    }
}

module.exports = Init;