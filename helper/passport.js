var passport = require('passport');

//这里需要引用user schema，注意引用的路径
var User = require('../models/user');
var localStategy = require('passport-local').Strategy;

//user信息序列化
passport.serializeUser(function (user, done) {
    console.log('----serializeUser-----');
    done(null, user.id);
});

//user信息反序列化
passport.deserializeUser(function (id, done) {
    console.log('----findById---->>-' +id);
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//这是处理用户注册的逻辑
passport.use('local.register', new localStategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true  //此处为true，下面函数的参数才能有req
}, function (req, username, password, done) {

    console.log('----local.doregister---->>-' +username);

    //req.checkBody('email', '您输入的email无效').notEmpty().isEmail();
    //req.checkBody('password', "您输入了无效密码").notEmpty().isLength({min: 4});
    var errors = req.validationErrors();

    console.log('----errors----：');
    console.log(errors);

    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'username': username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {message: "此邮件已经被注册"});
        }
        var newUser = new User();
        newUser.username =  req.body.username; //req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.mobile = req.body.mobile;
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

//这是处理用户登录的逻辑
passport.use('local.login', new localStategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true  //此处为true，下面函数的参数才能有req
}, function (req, username, password, done) {
    req.checkBody('username', '您输入的username无效').notEmpty();
    req.checkBody('password', "您输入了无效密码").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'username': username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: "用户名错误!"});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: "密码错误!"});
        }
        return done(null, user);
    });

}));