const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "HackNotificationTable";

const getNotifications = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const notifications = await dynamoClient.scan(params).promise();
  //   console.log(notifications);
  return notifications;
};

const getNotificationById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await dynamoClient.get(params).promise();
};

const createorUpdateNotification = async (notification) => {
  const params = {
    TableName: TABLE_NAME,
    Item: notification,
  };
  return await dynamoClient.put(params).promise();
};

const deleteNotificationById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
  getNotifications,
  createorUpdateNotification,
  getNotificationById,
  deleteNotificationById,
};

// {
//     "id": "1",
//     "title": "Notification 1",
//     "descrption": "A description of the notification.",
//     "due_date": "2023-01-29",
//     "priority": "medium",
//     "category": "malfunction",
//     "assign_to": "Jim",
//     "location": "Lorem ipsum",
//     "location_lat": -123.45,
//     "location_lon": 123.45,
//     "created_on": "2023-01-29",
//     "status": "unresolved",
//     "created_by": "divyanshu"
//   }

// createNotificatoin(noti);
// getNotifications();

/*
"@babel/core": "^7.8.4",
    "@babel/preset-env": "^7.8.4",
    "@babel/register": "^7.8.3",
"nodemon": "^2.0.2"
"body-parser": "^1.19.0",
pradeep barik10:51 PM
require("regenerator-runtime");// this library is for transpiling async function
// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")({
    presets: ["@babel/preset-env"]
});
// Import the rest of our application.
module.exports = require('./server')
pradeep barik10:53 PM
import express from 'express';
const app = express();
var server=app.listen(9010,()=>{
console.log("server is runnig on post 9010 ")
})
pradeep barik10:54 PM
"start": "nodemon index.js",
*/
