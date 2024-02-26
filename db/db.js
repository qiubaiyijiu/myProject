/**
 * 
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */

module.exports=function(success,error){
    // 判断 error 为其设置默认值
    if(typeof error!=='function'){
        error=()=>{
            console.log('数据库连接失败');
        }
    }

// 1.安装 mongoose
// npm i mongoose
// 2.导入 mongoose
const mongoose=require('mongoose');

// 导入配置文件
const {DBHOST,DBPORT,DBNAME}=require('../config/config.js');

// 设置 striectQuery 为 true    如有警告 可以加上这句话
mongoose.set('strictQuery',true);

// 3.连接 mongodb 服务
//                  协议     ip地址    端口号  数据库名
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);


// 4.设置回调       once 一次       事件回调函数只执行一次
mongoose.connection.once('open',()=>{
    success();
});


mongoose.connection.on('error',()=>{
    error();
})
mongoose.connection.on('close',()=>{
    // 设置连接关闭的回调
    console.log('连接关闭');
})

}
