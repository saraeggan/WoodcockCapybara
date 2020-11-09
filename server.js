// in terminal, write npm init -y to make a json package 
// install nodemon to update the server automatically (optional)

const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/user',function (req, res) {
    
    
    res.status(200).end();
    console.log(req.body);

});

const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => console.log(`server stared on port ${PORT} `)); 