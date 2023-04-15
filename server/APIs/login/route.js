const user =require("./controller")
module.exports = function (router) {
	router.post(
		'/login',
        user.login
	);
};
