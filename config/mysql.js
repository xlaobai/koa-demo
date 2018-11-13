let mysql = require('mysql');

//xlaobai

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lsx960202',
  database: 'php_text',
  connectionLimit : 10,
})

module.exports = pool;
