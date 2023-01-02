const mongo  = require('mongodb').MongoClient;
url="mongodb+srv://gopal:jhaji9871436400@cluster0.it4owmc.mongodb.net/?retryWrites=true&w=majority"
const dbName = 'project_ai';
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
      let {name,email,_id}=result[0];
      let data={name:name,email:email,id:id}
      res.send(data);
    }())
}