const mysql = require('mysql');
const syncMysql = require('sync-mysql');


//Настройка для локального сервера MAMP

const settingsMysql = {
    host: "localhost",
    port: 3306,
    user: "root",
    database: "e-banking",
    password: "root"
}

//Настройка для реального сервера hoster.by

// const settingsMysql = {
//     host: "localhost",
//     user: "webmakss_e_market",
//     database: "webmakss_detergents",
//     password: "263832263832nM"
// }

const conn = mysql.createConnection(settingsMysql);
const syncConn = new syncMysql(settingsMysql);

conn.connect(err => {
    if (err) {
        console.log(err);
        return err
    } else {
        console.log("Database--------OK")
    }
})

module.exports = conn;
module.exports = syncConn;