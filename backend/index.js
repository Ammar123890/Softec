//YARN Packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
require("dotenv").config();
// const http = require("http");
// const server = http.createServer(app);
// const socketIO= require('./Utils/socket')


//Project files and routes
const app=express();
//const apiRouter = require("./Routes");
const connect = require("./Config/db");



//connect to database
connect();

app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));



//Middlwares
app.use(bodyParser.json());
app.use(cors());

//connecting routes
//app.use("/api", apiRouter);
// const io = socketIO(server);


//Connect Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Your app is running on PORT ${PORT}`);
});
