const mongo  = require('mongodb').MongoClient;
const fs = require('file-system');

url="mongodb+srv://gopal:jhaji9871436400@cluster0.it4owmc.mongodb.net/?retryWrites=true&w=majority"
const dbName = 'project_ai';
const path=require('path')
const client= new mongo(url,(err)=>
{
    if(err) throw err;
})
client.connect()
const db = client.db(dbName);
const collection =db.collection("user")
exports.detail=(req,res)=>
{
    let id=req.body.id;
    (async function getData()
    {
      let result = await collection.find({"_id":id}).toArray();
      if(result.length>0)
      {
      let {name,email,_id}=result[0];
      let data={name:name,email:email,id:id}
      res.send(data);
      }
      else{
        error={
          msg:"wrong id"
        }
        res.send(error);
      }
    }())
}
exports.profile=(req,res)=>
{
  id=req.body.id
  var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    var finalImg = {
      contentType: req.file.mimetype,
      image: Buffer.from(encode_image, 'base64')
  };
  collection.updateOne({"_id":id},{$set: {"profile":finalImg}},(err)=>
  {
    if(err)
    {
      return res.send(err);
    }
    return res.send("file uploaded")
  })
}
exports.profile_get=async(req,res)=>
{
  let user=req.query["user"];
  let data=await collection.find({"_id":user}).toArray();
  if(data.length>0)
  {
  const result=data[0].profile;
  res.contentType(result.contentType);
  res.send(result.image.buffer)
  }
  else{
    res.send("error occure");
  }
}