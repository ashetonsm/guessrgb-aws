module.exports = {
    compare: function (inputPass, savedPass) {
        // Return true or false depending on match
        if (inputPass == savedPass) {
            return true;
        } else {
            return false;
        }
    }
}
