var express = require("express");
var bodyParser = require("body-parser");
const core=require("cors");
const router = express.Router();
var app = express();
var port = 3001;

app.use(bodyParser.json());
app.use(core({
    origin:"https://63ad485b00db1c6e4514adef--glittery-dango-a782d9.netlify.app",
}))

require(`${__dirname}/server/app`)(app, router);

app.listen(port, () => {
  console.log("server Start");
});
