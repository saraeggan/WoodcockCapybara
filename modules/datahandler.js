const pg = require('pg');
const dbcredentials = process.env.DATABASE_URL || require('../localenv').credentials;

class DataHandler {
    constructor(credentials) {
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }
    async addItem(data) {
        console.log(data);
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('insert into "public"."Taskmanager" (id, "listItem", username, "listName", share) values (default, $1, $2, $3, $4) returning id', [data.listItem, data.username, data.listName, data.share]);
            client.end();
            return results.rows[0].id;
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }
    }

    async deleteItem(id) {
        console.log(id);
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('delete from "public"."Taskmanager" where id=$1', [id]);
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }
    }

    async deleteList(data) {
        console.log(data);
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('delete from "public"."Taskmanager" where  "listName"= $1', [data]);
            client.end();
            return results;
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }
    }

    async viewMyLists(username) {
        console.log(username);
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('select * from "public"."Taskmanager" where username=$1', [username]);
            client.end();
            return results.rows;
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }
    }



    async getPassword(username) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('select password from "public"."User" where username = $1;', [username]);
            return results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }
    }

    async checkUser(username) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('select * from "public"."User" where username = $1;', [username]);
            return results.rows.length !== 0;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }
    }

    async insertUser(username, password) {
        let userExists = await this.checkUser(username);
        console.log(userExists);
        if (userExists) {
            console.log(1);
            return false;

        } else {
            console.log(2);
            const client = new pg.Client(this.credentials);
            let results = null;
            try {
                await client.connect();
                results = await client.query('INSERT INTO "public"."User" ("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);

                client.end();
            } catch (err) {
                client.end();
                console.log(err);
                results = err;
            }

            return results;
        }

    }

}

module.exports = new DataHandler(dbcredentials); 