// 导入 mongoose
const mongoose=require('mongoose');

    // 5创建文档的结构对象
// 设置集合中文档的属性以及属性值的类型
let BookSchema=new mongoose.Schema({
    name:String,
    author:String,
    price:Number,
    is_hot:Boolean,
    tags:Array,
    pub_time:Date,
    // test:mongoose.Schema.Types.Mixed
    // test:mongoose.Schema.Types.ObjectId //文档 ID   外键
    // test:mongoose.Schema.Types.Decimal128  // 高精度数字
});

// 创建模型对象   通过 mongoose.model() 方法对文档操作的封装对象
let BookModel=mongoose.model('books',BookSchema);

// 暴露模型对象
module.exports=BookModel;