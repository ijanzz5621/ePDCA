var connectionManager = require('../lib/connectionManager');
var q = require('q');

function executeQuery(sql){
    var deferred = q.defer();

    connectionManager.getConnection()
        .then(function(connection){
            connection.query(sql, function(err, results){
                if (err){
                    console.error(err);
                    deferred.reject(error);
                }
                deferred.resolve(results);
            })
        })
        .fail(function(err){
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });

    return deferred.promise;
}

module.exports = {
    executeQuery: executeQuery
}