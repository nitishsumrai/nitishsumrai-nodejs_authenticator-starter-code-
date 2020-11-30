const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'nodejs_authentication',
    smtp: {
        service: 'gmail',
        host: 'smpt.gmail.com',
        port: '587',
        secure: 'false',
        auth: {
            user: 'enter your username',
            pass: 'enter your password'
        }
    },
    google_client_id: 'enter your client id',
    google_client_secret: 'enter your client secret',
    google_callback_url: 'http://localhost:8000/user/auth/google/callback',
    mongoose_field_encryption_secret_key: 'some secret key'
}

const production = {
    name: 'production'
}

module.exports = development;