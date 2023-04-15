const controller = require("./controller");
module.exports = function (router) {
  router.post("/evaluate", controller.evaluate),
    router.post("/sample", controller.sample);
};
