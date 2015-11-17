var bcrypt = require('bcrypt');

module.exports = {
	generateHash: function (password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},

	isValidPassword: function (enteredPassword, storedPassword) {
		return bcrypt.compareSync(enteredPassword, storedPassword);
	}
};

