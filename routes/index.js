var crypto = require('crypto');
User = require('../models/user.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //首页
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res) {
    //登录
    res.render('login', {title: '登录'});
});

router.post('/login', function (req, res) {

});

router.get('/reg', function (req, res) {
    //注册
    res.render('reg', {title: '注册'});
});

router.post('/reg', function (req, res) {
    var name = req.body.name,
        passowrd = req.body.password,
        password_re = req.body['password-repeat'];
    //检验用户两次输入的密码是否一致
    if (password_re != passowrd) {
        req.flash('error', '两次输入的密码不一致!');
        return res.redirect('/reg');//返回注册页面
    }

    //生成密码的md5值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: req.body.name,
        password: password,
        email: req.body.email
    });
    //检查用户名是否已经存在
    User.get(newUser.name, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        if (user) {
            req.flash('error', '用户已存在!');
            return res.redirect('/reg');//返回注册页
        }
        //如果用户不存在则新增用户
        newUser.save(function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg')//注册失败返回首注册页
            }
            req.session.user = user; //用户信息存入session
            req.flash('success', '注册成功!');
            res.redirect('/');//注册成功后返回主页
        });
    });
});

router.get('/post', function (req, res) {
    //发表文章
    res.render('post', {title: '发表'});
});

router.post('/post', function (req, res) {

})

router.get('/logout', function (req, res) {
    //登出
});

module.exports = router;
