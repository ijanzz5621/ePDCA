var mysql = require('mysql');
var credentials = require('../credentials');

var connection = mysql.createConnection({
   
    host: credentials.mysql.host
    , user: credentials.mysql.username
    , password: credentials.mysql.password
    , database: credentials.mysql.liveDatabase

});

module.exports = function(){

    function getPlanList(){
        
        connection.connect(function(err){          
            if (err) throw err;
            console.log('mysql database connected');
        });

    }

};