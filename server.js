//expressのモジュールを読み込む
const express = require("express");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')
const goodsRouter = require('./api/goods')

const app = express();

// データベース接続情報
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: 3306,
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'kaimemo'
});

// データベースに接続できたらコンソールにConnectedを表示
connection.connect(function (err) {
    if (err) throw err;
    console.log('Database Connected!');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/api/goods', goodsRouter)
app.use(cors)

    
//listenイベントで3000番ポートでサーバーを起動する。
//consoleで確認
const PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("start server")
})