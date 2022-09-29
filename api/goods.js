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
var pool = mysql.createPool(dbConfig);

router.get('/', (req, res) => {
    console.log("[call goods api] : GET /api/goods/")
    pool.getConnection((err, connection) => {
        connection.query(
            `SELECT * FROM goods where user_id = "${req.query.user_id}" and deleted is null order by insert_date desc`,
            ((err, rows, fields) => {
                if (err) {
                    console.log('error: ', err);
                    throw err;
                }
                res.json(rows)
                connection.release();
            })
        )
    })
})

router.post('/', (req, res) => {
    console.log("[call goods api] : POST /api/goods/")
    const data = req.body
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    now.toLocaleString("ja")

    const q = `
    insert into goods  
    values (
        ${new Date().getTime()}, 
        "${data.user_id}",
        "${data.memo}", 
        "${data.category_id}",
        "${data.checked}", 
        "${now}", 
        null, 
        null)
        `
    pool.getConnection((err, connection) => {
        connection.query(q, (err, result, fileds) => {
            if (err) {
                console.log('error: ', err);
                throw err;
            }
            console.log(result)
            connection.release()
        })
    })
})

router.put('/', (req, res) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("[call goods api] : DELETE /api/goods")
    const data = req.body
    const q = `
        update goods set memo = "${data.memo}", update_date = "${now}" where id= "${data.id}"  
        `
    pool.getConnection((err, connection) => {
        connection.query(q, (err, result, fileds) => {
            if (err) {
                console.log('error: ', err);
                throw err;
            }
            console.log(result)
            connection.release()
        })
    })

    res.json("OK")
})

router.put('/check', (req, res) => {
    console.log("[call goods api] : DELETE /api/goods")
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const data = req.body
    const q = `
        update goods set checked = "1", update_date = "${now}" where id= "${data.id}"  
        `
    pool.getConnection((err, connection) => {
        connection.query(q, (err, result, fileds) => {
            if (err) {
                console.log('error: ', err);
                throw err;
            }
            console.log(result)
            connection.release()
        })
    })

    res.json("OK")
})

router.delete('/', (request, response) => {
    console.log("[call goods api] : DELETE /api/goods")
    console.log(request.body)
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const data = request.body
    const q = `
        update goods set deleted = "1", update_date = "${now}" where id= "${data.id}"  
        `
    pool.getConnection((err, connection) => {
        connection.query(q, (err, result, fileds) => {
            if (err) {
                console.log('error: ', err);
                throw err;
            }
            console.log(result)
            connection.release()
        })
    })

    response.json("OK")
})




// DockerのMySQLコンテナに外部からアクセスする方法まとめ改
// https://qiita.com/saken649/items/00e752d89f2a6c5a82f6
module.exports = router