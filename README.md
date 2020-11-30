# Nodejs-Authenticator(starter code)

## Description

 A complete authentication system which can be used as a starter code(with a little customisation) for creating any new application.User information is stored using mongoDB along with the session token.Authentication and session management is handled using passport.Nodemailer is used to mail the reset link for reset password.The system comes fully equiped with starter code for different functionalities and the required library setup. <br /><br />
 The functionalities include: <br /> <br />
 1.Sign up/Sign in with email(Implemented using passport local strategy) <br />
 2.Password encryption before storing in database.(mongoose-field-encryption) <br />
 3.Sign out. <br />
 4.Reset password after login. <br />
 5.Google login/signup(Implemented using passport OAuth2Strategy) <br />
 6.Forgot password(Nodemailer is used to send the reset link) <br />
 7.Flash notifications.(Implemented using flash and Noty)<br />


## Setting up the project
1. Clone at your local system.
2. Open the folder in visual studio code.
3. Open terminal and make the project folder as your current directory
4. Install all the dependencies as mentioned in the package.json :
```
npm install
```
5. Configure google authetication by adding **client id** and **client secret** in the`config\environment.js` file
   - To configure your own clinet id and secret, please refer: [Google developer docs](https://developers.google.com/adwords/api/docs/guides/authentication#create_a_client_id_and_client_secret).
6. Configure mailer:
   - Add **username** and **password** for the email address being used for sending the email in the`config\environment.js` file  
   - Add the from email address in `mailer\reset_password_mailers.js`
7. Configure mongoose field encryption by adding a secret key in the `config\environment.js` file


8.  input the command `node index.js` on terminal

9. Pat yourself in the back for making it so far!!

