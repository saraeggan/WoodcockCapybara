/*const pg = require('pg'); 


class storageHandler {
    this.credentials = {
        connectionString: credentials, //credentials er stringen fra Heroku som inneholder brukernavn og passord
        ssl: {
            rejectUnauthorized: false //legges til for at vi kan jobbe lokalt 
        }
    };
}

async insertUser(username, password) {
    const client = new pg.client(this.credentials);
    let result = null;
    try {
        await client.connect();
        results = await client.query('INSERT INTO'); //hvor det står sql code
        results = results.rows[0].message;
        client.end();
    } catch (err){
        client.end();
        console.log(err);
        results = err;
    }
}
*/
