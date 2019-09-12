const {mongoose} = require('./../config');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        isAsync: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
