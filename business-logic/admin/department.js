var connectionManager = require('../../lib/connectionManager');
var q = require('q');

function getDepartments(){
    var deferred = q.defer();

    connectionManager.getConnection()
        .then(function(connection){
            connection.query('select * from admin_department', function(err, results){
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

function getDepartmentByCode(companyCode, departmentCode){
    var deferred = q.defer();

    connectionManager.getConnection()
        .then(function(connection){
            connection.query('select * from admin_department where CompanyCode = \'' + companyCode + '\' and DepartmentCode =\'' + departmentCode + '\'', function(err, results){
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

function saveDepartment(sql){
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
    getDepartments: getDepartments
    , getDepartmentByCode: getDepartmentByCode
    , saveDepartment: saveDepartment
}