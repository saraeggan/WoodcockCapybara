//const database = require("./datahandler") 
//databasen ligger i en egen side datahandler

class User{
    constructor(username, password){
        this.username = username;
        this.password = password;
        this.valid = false;
    }

   /* async create(){
       try {
        await database.insert("user", this.username, this.password)

       }
        database.insert("user", this.username, this.password)
    }*/
}

module.export = User