const User = require('../models/user');

module.exports.profile = (req, res) => {

    return res.render("user_profile");
}

module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up.ejs', {
        title: "Sign Up"
    });
}

module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in.ejs', {
        title: "Sign In"
    });
}

// get sign up data
module.exports.create = (req, res) => {
    // todo
    console.log(req.body);
    if (req.body.password == req.body.confirm_password) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) { console.log("Error in finding user while signing up"); return; }
            if (!user) {
                User.create(req.body, function (err) {
                    if (err) {
                        console.log('error in creating a user while signing up', err);
                        return;
                    }
                });
            } else {
                res.redirect('back');
            }
        });
    } else {
        return res.redirect('back');
    }
    return res.redirect("/user/sign-in");
}

module.exports.createSession = (req, res) => {
    // todo
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect('/');
}