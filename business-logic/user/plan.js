var connectionManager = require('../../lib/connectionManager');
var q = require('q');
var uuid = require("uuid");

var commonFunc = require('../../business-logic/general/common');
var planController = require('../../controllers/plan/plan');

function saveNewPlan(loginUser, data) {

    var sql = "";
    var deferred = q.defer();

    var serialNumber = "";
    var _probStatement = data.txtProblemStatement;
    var _riskLevel = data.radioRiskLevel;
    var _financialImpact = data.txtFinancialImpact;
    var _isFollowStandard = (data.radioFollowStandard === "Yes") ? 1 : 0;

    connectionManager.getConnection()
        .then(function (connection) {

            // Create plan master rec guid
            var planRecGuid = uuid.v4();
            connection.beginTransaction(function (err) {

                // Generate Serial number
                sql = 'call sp_GenerateSerialNumber(\'PDCASerialNumber\')';
                connection.query(sql, function (err, rows, fields) {
                    if (err) {
                        connection.rollback(function () {
                            throw err;
                        })
                        return console.log('Error: ' + err);
                    }

                    serialNumber = rows[0][0].SerialNumber;

                    //save to plan master
                    sql = "insert into user_plan_master " +
                        "(RecGuid, ProbStatement, CurrentStatus, RiskLevel, FinancialImpact, IsStandardFollowed, SerialNumber, CreatedBy, CreatedOn) " +
                        "values ('" + planRecGuid + "', '" + _probStatement + "', 'NEW', '" + _riskLevel + "', '" + _financialImpact + "', " +
                        "'" + _isFollowStandard + "', '" + serialNumber + "', '" + loginUser + "', now())";
                    connection.query(sql, function (err, rows, fields) {
                        if (err) {
                            connection.rollback(function () {
                                //throw err;
                            })
                            return console.log('Error: ' + err);
                        }

                        //save plan teams
                        sql = "insert into user_plan_team (RecGuid, ParentGuid, UserId, UserType, CreatedBy, CreatedOn) VALUES ";
                        var teams = JSON.parse(data.hidTeamMembers);
                        teams.forEach(function (entry) {
                            var teamRecGuid = uuid.v4();
                            sql = sql + "('" + teamRecGuid + "', '" + planRecGuid + "', '" + entry.id + "', 'TM', '" + loginUser + "', now()),";
                        });
                        //remove last comma
                        sql = sql.replace(/,\s*$/, "");

                        connection.query(sql, function (err, rows, fields) {
                            if (err) {
                                connection.rollback(function () {
                                    //throw err;
                                })
                                return console.log('Error: ' + err);
                            }

                            //insert one record in team for login user
                            var teamRecGuid = uuid.v4();
                            sql = "insert into user_plan_team (RecGuid, ParentGuid, UserId, UserType, CreatedBy, CreatedOn) VALUES ";
                            sql = sql + "('" + teamRecGuid + "', '" + planRecGuid + "', '" + loginUser + "', 'TM', '" + loginUser + "', now())";

                            connection.query(sql, function (err, rows, fields) {
                                if (err) {
                                    connection.rollback(function () {
                                        //throw err;
                                    })
                                    return console.log('Error: ' + err);
                                }

                                //save team lead
                                sql = "insert into user_plan_team (RecGuid, ParentGuid, UserId, UserType, CreatedBy, CreatedOn) VALUES ";
                                var teams = JSON.parse(data.hidTeamLead);
                                teams.forEach(function (entry) {
                                    var recGuid = uuid.v4();
                                    sql = sql + "('" + recGuid + "', '" + planRecGuid + "', '" + entry.id + "', 'TL', '" + loginUser + "', now()),";
                                });
                                //remove last comma
                                sql = sql.replace(/,\s*$/, "");

                                connection.query(sql, function (err, rows, fields) {
                                    if (err) {
                                        connection.rollback(function () {
                                            //throw err;
                                        })
                                        return console.log('Error: ' + err);
                                    }

                                    //commit
                                    connection.commit(function (err) {
                                        if (err) {
                                            connection.rollback(function () {
                                                //throw err;
                                            });
                                            return console.log('Error: ' + err);
                                        }
                                        //console.log('Transaction Complete.');
                                        connection.end();
                                    }); // end commit

                                });



                            });



                        }); // end insert team

                    }); // end insert plan

                }); // end generate serial number

            }); //end begin transaction

        }); // end get connection

}; // end function

function getPlanList(loginUser, data){
    var deferred = q.defer();
    var sql = "select distinct a.*, c.Gender from user_plan_master as a " +
        "left join user_plan_team as b on a.RecGuid = b.ParentGuid " +
        "left join admin_user as c ON a.CreatedBy = c.Email " +
        "where a.CreatedBy = '" + loginUser + "' " +
        "or b.UserId = '" + loginUser + "';";

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

function getRootcauseList(planID){
    var deferred = q.defer();
    var sql = `select distinct a.*, b.Gender, b.Username 
        from user_plan_rootcause as a 
        left join admin_user as b ON a.CreatedBy = b.Email 
        where a.PlanGuid = '` + planID + `';`;

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

function addRootCause(planID, username, title, desc){
    var deferred = q.defer();

    var recGuid = uuid.v4();
    var sql = `call sp_UserPlan_AddRootCause 
        ('` + recGuid + `', '` + planID + `', '` + title + `', '` + desc + `', '` + username + `');
    `;

    console.log(sql);

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
    saveNewPlan: saveNewPlan
    , getPlanList: getPlanList
    , getRootcauseList: getRootcauseList
    , addRootCause: addRootCause
};