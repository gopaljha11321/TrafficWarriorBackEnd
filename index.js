var express = require("express");
const mongo = require("mongodb").MongoClient;
url ="mongodb+srv://gopal:jhaji9871436400@cluster0.it4owmc.mongodb.net/?retryWrites=true&w=majority";
const dbName = "project_ai";
var bodyParser = require("body-parser");
const client = new mongo(url, (err) => {
  if (err) throw err;
});
client.connect();
const db = client.db(dbName);
const collection = db.collection("user");
const core=require("cors");
const router = express.Router();
var app = express();
const env=require("./server/config/env")
var port = process.env.PORT || 3001;
app.use(core({
  origin:"*",
}))
app.use(bodyParser.json());
app.use(async(req,res,next)=>
{
 
  const notSecureUrl=["/login","/register","/profile_image","/testing","/evaluate","/sample","/evalute"]
  const original=req._parsedUrl.pathname;
  const auth=req.headers.key;
  let result = auth?await collection.find({ auth: auth }).toArray():[];
  if(notSecureUrl.includes(original)==true)
  {
    next();
  }
  else if(result.length>0)
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
