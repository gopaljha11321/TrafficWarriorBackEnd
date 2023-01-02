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
exports.login=(req,res)=>
{
    let email=req.body.email;
    let password=req.body.password;
    (async function getData()
  {
    let result = await collection.find({ email:email,status:true}).toArray();
    if(result.length>0)
    {
        if(result[0].password==password)
        {
            res_data={
                res_code:1,
                id:result[0]._id
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
    // let num=result+1;
    // const insertResult = collection.insertOne({_id:num, name:"Gopal Jha",email:"gopaljha11321@gmail.com",password:"8745977703"});
    res.send(res_data).status(200);  
  }());
}