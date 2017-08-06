var mysql = require('mysql');
var q = require('q');
var credentials = require('../credentials');

function getConnection(){
    var deferred = q.defer();

    var connection = mysql.createConnection({
       host: credentials.mysql.host
       , port: credentials.mysql.port
       , user: credentials.mysql.username
       , password: credentials.mysql.password
       , database: credentials.mysql.liveDatabase 
    });

    connection.connect(function(err){
        if (err){
            console.error(err);
            deferred.reject(err);
        }
        console.log('[Conn] - Connection created with id: ' + connection.threadId);
        deferred.resolve(connection);
    });

    return deferred.promise;
    //return connection;
}

function prepareQuery(query, parameters){
    if (!query || !parameters){
        throw new Error('query and parameters should be provided!');
    }

    return mysql.format(query, parameters);
}

module.exports = {

    getConnection : getConnection
    , prepareQuery: prepareQuery

}
