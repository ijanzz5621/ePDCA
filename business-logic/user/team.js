var connectionManager = require('../../lib/connectionManager');
var q = require('q');

var commonController = require('../../lib/dbCommand');


function getTeamMembers(userEmailId) {

    var deferred = q.defer();
    var sql = "select *, 'LEAD' as GroupName from admin_user where Email = ( " +
        "select SupervisorId from admin_user where Email = '" + userEmailId + "') " +
        "union all " +
        "select *, 'COLLEAGUE' as GroupName from admin_user where SupervisorId =  " +
        "(select SupervisorId from admin_user where Email = '" + userEmailId + "') " +
        "and Email <> '" + userEmailId + "' and SupervisorId <> '" + userEmailId + "' " +
        "and Email <> ( " +
        "select SupervisorId from admin_user where Email = '" + userEmailId + "') " +
        "union all " +
        "select *, 'SUBORDINATES' as GroupName from admin_user where SupervisorId = '" + userEmailId + "' " +
        ";"

    connectionManager.getConnection()
        .then(function (connection) {
            connection.query(sql, function (err, results) {
                if (err) {
                    console.error(err);
                    deferred.reject(error);
                }
                deferred.resolve(results);
            })
        })
        .fail(function (err) {
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });

    return deferred.promise;
}

module.exports = {

    getTeamMembers: getTeamMembers

}