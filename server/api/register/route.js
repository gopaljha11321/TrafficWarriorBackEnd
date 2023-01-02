const user =require("./controller")
module.exports = function (router) {
	router.post(
		'/register',
        user.register
	);
};
