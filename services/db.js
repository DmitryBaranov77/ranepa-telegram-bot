const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD
});

function getDataFromDb(){
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM questions", function(err, result){
            if(err) reject(err);
            resolve(result);
        });
        connection.end();
    })
    
    
}

module.exports = getDataFromDb;