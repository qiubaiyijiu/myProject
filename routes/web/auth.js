var express = require('express');
var router = express.Router();
// 导入 用户模型
const UserModel=require('../../models/UserModel')
const md5=require('md5');

router.get('/reg',(req,res)=>{
    // 响应 HTML 内容
    res.render('auth/reg');
})

router.post('/reg',(req,res)=>{
    // 做表单验证
    // 获取请求体的数据
    UserModel.create({...req.body,password:md5(req.body.password)},(err,data)=>{
        if(err){
            res.status(500).send('注册失败，请稍后再试~~');
            return;
        }
        res.render('success',{msg:'注册成功',url:'/login'});
    })


})


// 登录页面
router.get('/login',(req,res)=>{
    // 响应 HTML 内容
    res.render('auth/login');
})

// 登陆操作
router.post('/login',(req,res)=>{
    // 获取用户名和密码
    let {username,password}=req.body;
    // 查询数据库
    UserModel.findOne({username:username,password:md5(password)},(err,data)=>{
        // 判断
        if(err){
            res.status(500).send('登陆失败，请稍后再试~~');
            return;
        }
        // 判断 data
        if(!data){
            return res.send('账号或密码错误');
        }

        // 写入session
        req.session.username=data.username;
        req.session.id=data._id;

        // 登陆成功响应
        res.render('success',{msg:'登陆成功',url:'/account'});
    })



})

// 退出登录
router.post('/logout',(req,res)=>{
    // 销毁 session
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功',url:'/login'});
    })
})





module.exports = router;
