const User = require('../models/user');
const crypto = require('crypto');
const resetPasswordMailer = require('../mailer/reset_password_mailers');

module.exports.profile = (req, res) => {
    return res.render("user_profile", { title: "Profile Page" });
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
        req.flash('error', 'Entered Passwords are not mathing.')
        return res.redirect('back');
    }
    return res.redirect("/user/sign-in");
}

module.exports.createSession = (req, res) => {
    // todo
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}

module.exports.forgotPassword = (req, res) => {
    console.log('hi I have forgotten password')
    res.render('forgot_password',{ title: "Forgot Password" });
}
module.exports.resetPassword = (req, res) => {
    User.findOneAndUpdate({ email: req.body.email },
        { $set: { password: crypto.randomBytes(20).toString('hex'), __enc_password: false } }, { new: true }, function (err, user) {
            if (err) {
                console.log('error in finding and updating user in reset password', err);
                return;
            }
            if (user) {
                console.log(user);
                resetPasswordMailer.resetPassword(user);
                req.flash('success', 'new password has been sent on your email');
                return res.redirect('/');
            } else {
                req.flash('error', 'invalid email');
                return res.redirect('back');
            }
        });


}

module.exports.destroySession = (req, res) => {
    req.flash('success', 'logged out successfully');
    req.logout();
    return res.redirect('/');
}

module.exports.getNewPassword = (req, res) => {
    return res.render('get_new_password',{title:"Reset Password"});
}

module.exports.setNewPassword = (req, res) => {
    console.log(req.user, 'sda');
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'enter matching password');
        res.redirect('back');
    } else {
        User.findOneAndUpdate({ email: req.user.email }, { $set: { password: req.body.password, __enc_password: false } }, function (err, user) {
            if (err) {
                console.log('error in reseting password', err); return;
            }
            req.flash('success', 'Password Successfully changed');
            return res.redirect('/');
        })
    }
}
