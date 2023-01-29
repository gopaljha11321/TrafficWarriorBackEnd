const user = require("./controller");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./server/static/profile_image");
  },
  filename: (req, file, cb) => {
    cb(null, path.basename(file.originalname));
  },
});
const upload = multer({ storage: storage });
module.exports = function (router) {
  router.post("/user", user.detail),
    router.post("/upload_profile_image", upload.single("image"), user.profile),
    router.get("/profile_image", user.profile_get);
};
