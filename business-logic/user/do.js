var connectionManager = require('../../lib/connectionManager');
var q = require('q');
var uuid = require("uuid");

var commonFunc = require('../../business-logic/general/common');

function getDoActualRootcauseList(userID){
    var deferred = q.defer();
    var sql = `select distinct a.*, c.Gender, c.Username, d.ProbStatement  
    from user_plan_rootcause as a 
    left join user_plan_team as b on a.RecGuid = b.ParentGuid 
    left join admin_user as c ON a.CreatedBy = c.Email 
    left join user_plan_master AS d ON a.PlanGuid = d.RecGuid 
    where (a.CreatedBy = '` + userID + `' or b.UserId = '` + userID + `')
    and a.IsActualRootcause = 'Y'
    ;`;

    //console.log(sql);

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

function getDoActualRootcauseDetails(rootcauseID){
    var deferred = q.defer();
    var sql = `select distinct a.*, c.Gender, c.Username, d.ProbStatement  
    from user_plan_rootcause as a 
    left join user_plan_team as b on a.RecGuid = b.ParentGuid 
    left join admin_user as c ON a.CreatedBy = c.Email 
    left join user_plan_master AS d ON a.PlanGuid = d.RecGuid 
    where a.RecGuid = '` + rootcauseID + `';`;

    //console.log(sql);

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

function saveDoAction(rootcauseID, actionName, assignee, dueDate, createdBy){
    var deferred = q.defer();
    var actionGuid = uuid.v4();

    var sql = `call sp_UserDo_AddAction ('` + actionGuid + `', '` + rootcauseID + `', '` + actionName + `', '` + assignee + `', '` + dueDate + `', 'OPEN', '` + createdBy + `');`;

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

function getDoActualRootcauseActions(rootcauseID){
    var deferred = q.defer();
    var sql = `select a.*, b.Username, b.Gender
    from epdca_live.user_do_action AS a
    left join admin_user AS b ON a.Assignee = b.Email
    where a.RootcauseGuid = '` + rootcauseID + `';`;

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
    getDoActualRootcauseList: getDoActualRootcauseList
    , getDoActualRootcauseDetails: getDoActualRootcauseDetails
    , saveDoAction: saveDoAction
    , getDoActualRootcauseActions: getDoActualRootcauseActions
};