var express = require("express");
var bodyParser = require("body-parser");
const core=require("cors");
const router = express.Router();
var app = express();
const env=require("./server/config/env")
var port = process.env.PORT || 3001;
app.use(core({
  origin:"*",
}))
app.use(bodyParser.json());
app.use((req,res,next)=>
{
  const auth=req.query.auth;
  if(auth==="false"||req.headers.key===env.local.jwt_header_key)
  {
    next();
  }
  else{
    res.send("Sorry, you don't have a license")
  }
})


require(`${__dirname}/server/app`)(app, router);

app.listen(port, () => {
  console.log("server Start");
});
