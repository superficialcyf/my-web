const mongoose = require('mongoose')
const config = require('./config')

module.exports = ()=>{
    mongoose.connect(config.mongodb)

    var db = mongoose.connection;
    db.on('error',console.log.bind('console','mongodb数据库连接错误！'));
    db.on('open',(callback)=>{
        console.log('mongodb数据库连接成功！');
    })
    return db;
}