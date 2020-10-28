// in terminal, write npm init -y to make a json package 
// install nodemon to update the server automatically (optional)

const express = require('express');
const path = require('path');  
const app = express(); 

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));

}); 

const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => console.log(`server stared on port ${PORT} `)); 