/**
 * Created by zhouchunjie on 16/8/4.
 */

var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
};

module.exports = User;

//存储用户信息
User.prototype.save = function (callback) {
    //要存入数据库的用户文档
    var user = {
        name : this.name,
        password: this.password,
        email:this.email
    };

    //打开数据库
    mongodb.open(function (err, db) {
        if (err){
            return callback(err); // 错误,返回错误信息 err
        }

        //读取users集合
        db.collection('users', function (err, collection) {
            if (err){
                mongodb.close();
                return callback(err); //错误
            }
            //讲用户用户插入user集合
            collection.insert(user, {
                safe: true
            }, function (err, user) {
                mongodb.close();
                if (err){
                    return callback(err); //错误
                }
                callback(null, user[0]);
            });
        });
    });
};

//读取用户信息
User.get = function (name, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err){
            return callback(err);//错误
        }
        //读取user集合
        db.collection('users', function (err, collection) {
            if (err){
                mongodb.close();
                return callback(err); //错误
            }
            //查找用户名(name 为键) 值为那么 一个文档
            collection.findOne({
                name:name
            }, function (err, user) {
                mongodb.close();
                if (err){
                    return callback(err);//错误
                }
                callback(null, user);//成功
            })
        })
    })
}