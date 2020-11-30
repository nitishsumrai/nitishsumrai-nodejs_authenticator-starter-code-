const mongoose = require('mongoose');
const env = require('../config/environment');

const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    }
}, { timestamps: true }
);

userSchema.plugin(mongooseFieldEncryption, { fields: ["password"], secret: env.mongoose_field_encryption_secret_key });



const User = mongoose.model('User', userSchema);
module.exports = User;