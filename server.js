//expressのモジュールを読み込む
const express = require("express");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')
const goodsRouter = require('./api/goods')

const app = express();

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