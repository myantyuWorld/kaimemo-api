const express = require('express')
const mysql = require('mysql');
const router = express.Router()

// データベース接続情報
// "npx heroku login" -> "npx heroku config"で確認
const dbConfig = {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: 3306,
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'kaimemo'
}
let connection;

handleDisconnect = () => {
    console.log("INFO.CONNECT_DB: ")
    connection = mysql.createConnection(dbConfig);

    // データベースに接続できたらコンソールにConnectedを表示
    connection.connect((err) => {
        console.log('Database Connected!');
        if (err) {
            console.log('ERROR.CONNECT_DB', err)
            setTimeout(handleDisconnect, 3000)
        }
    });

    connection.on('error',  ((err) => {
        console.log('ERROR.DB: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('ERROR.CONNECTION_LOST: ', err);
            handleDisconnect();
        } else {
            throw err;
        }
    }))
}

handleDisconnect()

router.get('/', (req, res) => {
    console.log("call /api/goods/")
    connection.query(
        'SELECT * FROM goods',
        (error, results) => {
            console.log(results)
            res.json(results)
        }
    )
})

// router.post('/', (req, res) => {
//     const data = req.body
//     const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
//     now.toLocaleString("ja")

//     const q = `insert into goods values (${new Date().getTime()}, "${data.user_id}","${data.memo}", "${data.category_id}","${data.checked}", "${now}", null)`
//     connection.query(q, (err, result, fileds) => {
//         if (err) throw err

//         console.log(result)
//     })
// })




// DockerのMySQLコンテナに外部からアクセスする方法まとめ改
// https://qiita.com/saken649/items/00e752d89f2a6c5a82f6
module.exports = router