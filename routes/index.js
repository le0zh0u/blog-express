var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //首页
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res) {
    //登录
    res.render('login', {title:'登录'});
});

router.post('/login' ,function(req, res) {

});

router.get('/reg', function (req, res) {
    //注册
    res.render('reg', {title:'注册'});
});

router.post('/reg', function (req, res) {

})

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
