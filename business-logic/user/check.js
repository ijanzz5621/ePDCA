var connectionManager = require('../../lib/connectionManager');
var q = require('q');
var uuid = require("uuid");

var commonFunc = require('../../business-logic/general/common');

function getCheckActions(rootcauseID){
    var deferred = q.defer();
    var sql = `select a.*, b.Username, b.Gender
    from epdca_live.user_do_action AS a
    left join admin_user AS b ON a.Assignee = b.Email
    
    `;
    //where a.RootcauseGuid = '` + rootcauseID + `';

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
    getCheckActions: getCheckActions
};