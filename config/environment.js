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
            user: 'nitishyadav169@gmail.com',
            pass: 'nitish169'
        }
    },
    google_client_id: '782606383375-dmbt4r1rg3suvpa4g6vthakbukltfahj.apps.googleusercontent.com',
    google_client_secret: 'LiZgkiSNFanadzzP7J5vSFc8',
    google_callback_url: 'http://localhost:8000/user/auth/google/callback',
    mongoose_field_encryption_secret_key: 'some secret key'

}

const production = {
    name: 'production'
}

module.exports = development;