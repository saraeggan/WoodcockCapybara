const express = require('express');
const { Server } = require('http');
const path = require('path');
const app = express();


app.get('/', (rep,res) => {
    res.sendFile(path.join(__dirname, 'public', 'create_user.html'));
});

app.post('/user',function (req, res) {
    
    
    res.status(200).end();
    console.log(req.body);

});



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started on port ${PORT}` ));