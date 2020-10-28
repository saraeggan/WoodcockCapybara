const express = require('express');
const path = require('path');
const app = express();

app.get('/', (rep,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started on port ${PORT}` ));