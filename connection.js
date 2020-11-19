const mysql = require('mysql');

const mySqlCommection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'express-demo',
    multipleStatements : true
}); 

mySqlCommection.connect((err) => {
    if(!err){
        console.log('Connected');
    }else{
        console.log('Connection Failed');
    }
});

module.exports = mySqlCommection;