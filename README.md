# kaimemo-api

## 開発状況

- herokuに本APIはデプロイ済み（mysqlとも連携済み）
- TBD

## mysql-docker

mysqlコンテナを実行する手順

```sh
$ cd mysql-docker
$ docker-compose up
```

## api

ローカルAPIの実行方法手順です

```sh
$ cd .
$ npm start
```
※ heroku実行時は、"process.env.XXXXX"を参照するが、ローカル実行する際は以下のように、
デフォルト値を使用します（mysql-dockerで設定している値） "|| の右辺"

```js
const dbConfig = {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: 3306,
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'kaimemo'
}
```

# heroku database maintenance

```sh
$ cd mysql-docker
$ "docker-compose attach-shell(Docker Exploerなどで)"
// {xxxxxx}は、npx heroku configなどで確認可能
sh4-4# mysql -u{heroku database user} -p -h {heroku database host} {heroku database name}
Enter Password : {heroku database password}
mysql> 
```