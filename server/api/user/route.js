const user =require("./controller")
module.exports = function (router) {
	router.post(
		'/user',
        user.detail
	);
};
