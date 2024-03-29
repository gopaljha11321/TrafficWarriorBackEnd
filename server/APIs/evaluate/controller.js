const axios = require("axios");
const mongo = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
url =
  "mongodb+srv://gopal:jhaji9871436400@cluster0.it4owmc.mongodb.net/?retryWrites=true&w=majority";
const dbName = "project_ai";
const env = require("../../config/env");
const { response } = require("express");
const client = new mongo(url, (err) => {
  if (err) throw err;
});
client.connect();
const db = client.db(dbName);
const collection = db.collection("questions");

// {
//   "answer":"laxman kill supnakha nose",
//   "keys":["laxman","kill","supnakha"],
//   "layer":5,
//   "percentage":[0.8,0.2],
//   "code":"1"
// }
exports.sample = async (request, response) => {
  const get_all = await collection.find({ _id: { $exists: true } }).toArray();
  const data = {
    question: request.body.question,
    sample: request.body.sample,
    keys: request.body.keys,
    layer: request.body.layer,
    percentage: request.body.percentage,
    code: get_all.length + 1,
  };
  await collection.insertOne(data);
  return response.status(200).send(data);
};
exports.allQuestion = async (request, response) => {
  const get_all = await collection.find({ _id: { $exists: true } }).toArray();
  let questions = [];
  for (let i = 0; i < get_all.length; i++) {
    let temp = {
      label: get_all[i].question,
      code: get_all[i].code,
    };
    questions.push(temp);
  }
  return response.send(questions);
};
exports.average = async (request, response) => {
  const question_code = request.query.data;
  const data = await collection.findOne({ code: Number(question_code) });
  let average_value;
  await axios
    .post("https://ai-answer-evaluation.onrender.com/average", data)
    .then((res) => {
      average_value = res.data;
      response.send(String(average_value));
    });
  collection.updateOne(
    { code: Number(question_code) },
    { $set: { average: average_value } }
  );
};
exports.evaluate = async (request, response) => {
  question_code = request.body.code;
  const data = await collection.findOne({ code: question_code });
  let average_value = data.average;
  delete data.question;
  delete data._id;
  data.answer = request.body.answer;
  let user_score = 0;
  delete data.sample;
  await axios
    .post("https://ai-answer-evaluation.onrender.com/evaluate", data)
    .then((res) => {
      user_score = res.data;
    });
  return response.send(
    String(Math.floor((user_score / average_value) * 100)) + "%"
  );
};
