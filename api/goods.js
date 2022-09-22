const express = require('express')
const mysql = require('mysql');
const router = express.Router()

// データベース接続情報
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'kaimemo'
});


router.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM goods',
        (error, results) => {
            console.log(results)
            res.json(results)
        }
    )
})

router.post('/', (req, res) => {
    console.log(req.body)
    console.log(req.body.id)
    const data = req.body
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    now.toLocaleString("ja")

    console.log(now)
    const q = `insert into goods values (${new Date().getTime()}, "${data.user_id}","${data.memo}", "${data.category_id}","${data.checked}", "${now}", null)`
    connection.query(q, (err, result, fileds) => {
        if (err) throw err

        console.log(result)
    })
})




// DockerのMySQLコンテナに外部からアクセスする方法まとめ改
// https://qiita.com/saken649/items/00e752d89f2a6c5a82f6
module.exports = router