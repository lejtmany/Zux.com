var bcryptjs = require('bcryptjs');

module.exports = {
	generateHash: function (password) {
		return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8), null);
	},

	isValidPassword: function (enteredPassword, storedPassword) {
		return bcryptjs.compareSync(enteredPassword, storedPassword);
	}
};

