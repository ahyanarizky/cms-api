var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const AutoIncrement = require('mongoose-sequence');

var userSchema = mongoose.Schema({
    UserId: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(email) {
                return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)
            },
            message: `WRONG EMAIL FORMAT`
        },
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
});

userSchema.plugin(AutoIncrement, { inc_field: 'UserId' });
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);
