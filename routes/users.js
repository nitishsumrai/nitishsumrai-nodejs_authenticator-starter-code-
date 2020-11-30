const express = require('express');

const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);

// use passport.js as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/user/sign-in' }
), userController.createSession);

router.get('/sign-out', userController.destroySession);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/sign-in' }), userController.createSession);

router.get('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

router.get('/get-new-password', userController.getNewPassword);
router.post('/set-new-password', userController.setNewPassword);

module.exports = router;