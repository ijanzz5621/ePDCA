var mysql = require('mysql');

var connection = mysql.createConnection({
   
    host: 'localhost'
    , user: 'root'
    , password: 'ch@rm1n9'
    , database: 'ePDCA'

});

module.exports = function(){

    function getPlanList(){
        
        connection.connect(function(err){
            
            if (err) throw err;
            console.log('mysql database connected');

            

        });

    }

};