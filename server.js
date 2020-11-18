const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

const user = require('./modules/user');


app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/frontpage', function (req, res){
  
  
});


app.post('/user', async function (req, res) {
    
    const newuser = new user(req.body.username, req.body.password);
    await newuser.create();
    res.status(200).json(newuser).end();
    //console.log(req.body);

});





const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => console.log(`server stared on port ${PORT} `)); 