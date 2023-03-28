const User = require("../models/user.model.js");
const createError = require("../utils/createError.js");

const deleteUser = async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (req.userId !== user._id.toString())
		return next(createError(403, "You are not authorized"));

	await User.findByIdAndDelete(req.params.id);
	res.status(200).send("User deleted");
};

const getUser = async (req, res, next) => {
	const user = await User.findById(req.params.id);
	res.status(200).send(user);
};

module.exports = { deleteUser, getUser };
