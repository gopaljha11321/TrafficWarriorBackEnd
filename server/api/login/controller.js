const mongo  = require('mongodb').MongoClient;
const jwt=require("jsonwebtoken")
url="mongodb+srv://gopal:jhaji9871436400@cluster0.it4owmc.mongodb.net/?retryWrites=true&w=majority"
const dbName = 'project_ai';
const env=require("../../config/env")
const client= new mongo(url,(err)=>
{
    if(err) throw err;
})
client.connect()
const db = client.db(dbName);
const collection =db.collection("user");
exports.login=async (req,res)=>
{
    let email=req.body.email;
    let password=req.body.password;
    (async function getData()
  {
    let result = await collection.find({email:email,status:true}).toArray();
    if(result.length>0)
    {
        if(result[0].password==password)
        {
            const token=await jwt.sign({email:result[0]._id},env.local.jwt_header_key)
            const insertResult = await collection.updateOne({email:email},{$set:{"auth":token}});
            res_data={
                res_code:1,
                id:result[0]._id,
                auth:token
            }
        }
        else{
            res_data={
                res_code:0,
                error:"Please enter correct password"
            }
        }
    }
    else{
        res_data={
            res_code:0,
            error:"Access is denied."
        }
    }
    return res.send(res_data).status(200);  
  }());
}