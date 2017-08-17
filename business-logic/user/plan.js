var connectionManager = require('../../lib/connectionManager');
var q = require('q');
var uuid = require("uuid");

var commonFunc = require('../../business-logic/general/common');
var planController = require('../../controllers/plan/plan');

function saveNewPlan(loginUser, data){

    var sql = "";
    var deferred = q.defer();

    var serialNumber = "";
    var _probStatement = data.txtProblemStatement;
    var _riskLevel = data.radioRiskLevel;
    var _financialImpact = data.txtFinancialImpact;
    var _isFollowStandard = (data.radioFollowStandard === "Yes") ? 1 : 0;

    connectionManager.getConnection()
        .then(function(connection){

            // Create plan master rec guid
            var planRecGuid = uuid.v4();
            connection.beginTransaction(function(err){

                // Generate Serial number
                sql = 'call sp_GenerateSerialNumber(\'PDCASerialNumber\')';
                connection.query(sql, function (err, rows, fields) {
                    if (err) {
                        connection.rollback(function(){
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
                            connection.rollback(function(){
                                //throw err;
                            })
                            return console.log('Error: ' + err);
                        }

                        //save plan teams
                        sql = "insert into user_plan_team (RecGuid, ParentGuid, UserRecGuid, UserType, CreatedBy, CreatedOn) VALUES ";
                        var teams = JSON.parse(data.hidTeamMembers);
                        teams.forEach(function(entry) {          
                            var teamRecGuid = uuid.v4();
                            sql = sql + "('" + teamRecGuid + "', '" + planRecGuid + "', '" + entry.id + "', 'TM', '" + loginUser + "', now()),";
                        });
                        
                        //remove last comma
                        sql = sql.replace(/,\s*$/, "");
                        
                        connection.query(sql, function (err, rows, fields) {
                            if (err) {
                                connection.rollback(function(){
                                    //throw err;
                                })
                                return console.log('Error: ' + err);
                            }

                            //commit
                            connection.commit(function(err) {
                                if (err) { 
                                  connection.rollback(function() {
                                    //throw err;
                                  });
                                  return console.log('Error: ' + err);
                                }
                                console.log('Transaction Complete.');
                                connection.end();
                              }); // end commit

                        }); // end insert team

                    }); // end insert plan

                }); // end generate serial number

            }); //end begin transaction

        }); // end get connection

}; // end function

module.exports = {
    saveNewPlan: saveNewPlan
};