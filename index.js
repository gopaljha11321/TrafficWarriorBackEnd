var express = require("express");
var bodyParser = require("body-parser");
const core=require("cors");
const router = express.Router();
var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(core({
    origin:"*",
}))

require(`${__dirname}/server/app`)(app, router);

app.listen(port, () => {
  console.log("server Start");
});
