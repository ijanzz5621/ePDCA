var connectionManager = require('../../lib/connectionManager');
var q = require('q');

function getCompanies(){
    var deferred = q.defer();

    connectionManager.getConnection()
        .then(function(connection){
            connection.query('select * from admin_company', function(err, results){
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

function getCompanyByCode(companyCode){
    var deferred = q.defer();

    connectionManager.getConnection()
        .then(function(connection){
            connection.query('select * from admin_company where CompanyCode =\'' + companyCode + '\'', function(err, results){
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

function saveCompany(sql){
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
    getCompanies: getCompanies
    , getCompanyByCode: getCompanyByCode
    , saveCompany: saveCompany
}