const express = require("express");
const authenticator = require('./auth'); 

let secret = express.Router(); 
secret.use(authenticator); 

secret.get("/", (req, res, next) => {

}); 

module.exports = secret; 