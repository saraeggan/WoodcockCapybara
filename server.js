// in terminal, write npm init -y to make a json package 
// install nodemon to update the server automatically (optional)

const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

//const users = require('./modules/user');

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/user',function (req, res) {
    
    //const newuser = new user(req.body.username, req.body.password);

    res.status(200).json(newuser).end();
    console.log(req.body);

});

const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => console.log(`server stared on port ${PORT} `)); 