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
exports.register=(req,res)=>
{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    let result;
    const getCount =async()=>
    {
        result = await collection.find({ email:email}).toArray();
        if(result.length>0)
        {
            res.send({res_code:0,err:"Email already in use"});
        }
        else{
        const insertResult = collection.insertOne({_id:email.split("@")[0], name:name,email:email,password:password,status:false});
        res.send({res_code:1,inf:"data added"});
        }
    }
    getCount();
}