
const express = require('express');
const bodyParser = require('body-parser');
const storage = require('./modules/datahandler');
const crypto = require('crypto');
const {generateToken, checkToken, getPayload} = require('./modules/token'); 
const secret = process.env.hashSecret || require('./localenv').hashSecret;

const app = express(); 

app.use(bodyParser.json());
app.use(express.static('public'));


// --

const authenticator = async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1) {
      return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end()
  }

  const credentials = req.headers.authorization.split(' ')[1]; 
  const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

  const user = await authenticate(username, password);
  
  if (user === false) {
      req.login = false;
  } else {
      req.login = true;
      req.username = username; 
  }
  //req.user = user; 
  next();
}

// --
async function authenticate(username, password) {
  let psw = crypto.createHmac('sha256', secret)
          .update(password)
          .digest('hex');            

  let passwordDb = await storage.getPassword(username); 
  

  if(psw === passwordDb.password){

    return username;

  } else {

    return false; 

  }

}


app.post('/login', authenticator, async function (req, res){
  
  

  if(req.login) {
    let token = generateToken({username: req.username});
     
    res.status(200).json(token).end();

  } else {

    res.status(403).end();
  }
  

});
app.post('/frontpage', function (req, res){



});


app.post('/user', async function (req, res) {

  let user = req.body.username;
  let psw = req.body.password; 
  psw = crypto.createHmac('sha256', secret)
                        .update(psw)
                        .digest('hex');                
  let result = await storage.insertUser(user, psw); 
  console.log(result); 
  if (result){
    res.status(200).json("success!").end(); 
  }else {
    res.status(200).json("failed").end(); 
  }


    
    //const newuser = new user(req.body.username, req.body.password);
    //await newuser.create();
    //res.status(200).json(newuser).end();
    //console.log(req.body);

});


app.post("/addItem", async function (req, res){

  const token = req.headers.authorization.split(' ')[1]; 

  let access = checkToken(token);

  if(access){

    let payload = JSON.parse(getPayload(token));
    req.body.username = payload.username;
    //console.log(req.body);
    let result = await storage.addItem(req.body); 
    console.log(result); 

    
  }else{
    console.log("denied");
  }


});


const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => console.log(`server stared on port ${PORT} `)); 