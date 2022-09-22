//expressのモジュールを読み込む
const express = require("express");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')
const goodsRouter = require('./api/goods')

const app = express();
const PORT = 3000

// データベース接続情報
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'kaimemo'
});

// データベースに接続できたらコンソールにConnectedを表示
connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/api/goods', goodsRouter)
app.use(cors)


app.get("/sample", (req, res) => {
    res.send("sample");
    
    connection.query(
        'SELECT * FROM goods',
        (error, results) => {
            console.log(results)
        }
    )
})
    
//listenイベントで3000番ポートでサーバーを起動する。
//consoleで確認
app.listen(PORT, () => {
    console.log("start server")
})