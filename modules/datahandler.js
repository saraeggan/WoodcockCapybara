const pg = require('pg'); 
const dbcredentials = process.env.DATABASE_URL || require('../localenv').credentials; 

class DataHandler {
    constructor(credentials){
        this.credentials = {
            connectionString: credentials, //credentials er stringen fra Heroku som inneholder brukernavn og passord
            ssl: {
                rejectUnauthorized: false //legges til for at vi kan jobbe lokalt 
            }
        };   
    }
    
    

    async insertUser(username, password) {
        const client = new pg.Client(this.credentials);
        let results = null;
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

        return results;
    }

    async insert (...params) {
        const client = new pg.Client(this.credentials); 
        let results = null; 
        try{
            await client.connect(); 
            results = await client.query('INSERT'); 
            results = results.rows[0].message;
            client.end();
        }catch (err) {
            client.end(); 
            results = err; 
        }
        return results; 
    }
    
} 

module.exports = new DataHandler(dbcredentials); 