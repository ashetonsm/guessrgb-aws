var bcrypt = require('bcryptjs');
var salt = process.env.SALT

module.exports = {
    hash: function (plainText) {
        return bcrypt.hashSync(plainText, salt);
    },
    compare: function (inputPass, savedPass) {
        // Return true or false depending on match
        if (inputPass == savedPass) {
            return true;
        } else {
            return false;
        }
    }
}
