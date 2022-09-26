const express = require('express')
const mysql = require('mysql');
const router = express.Router()

// データベース接続情報
// データベース接続情報
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: 3306,
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'kaimemo'
});


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