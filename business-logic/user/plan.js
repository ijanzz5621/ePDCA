var connectionManager = require('../../lib/connectionManager');
var q = require('q');
var uuid = require("uuid");

var commonFunc = require('../../business-logic/general/common');
var planController = require('../../controllers/plan/plan');

function saveNewPlan(data){

    var sql = "";
    var deferred = q.defer();

    var serialNumber = "";

    connectionManager.getConnection()
        .then(function(connection){

            // Create plan master rec guid
            var planRecGuid = uuid.v4();
            console.log('random id: ' + planRecGuid);

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
                    console.log('serialNumber: ' + serialNumber);

                    //save to plan master
                    sql = 'select * from user_plan_master';
                    connection.query(sql, function (err, rows, fields) {
                        if (err) {
                            connection.rollback(function(){
                                //throw err;
                            })
                            return console.log('Error: ' + err);
                        }

                        //proceed with next query
                        console.log(rows);

                        connection.commit(function(err) {
                            if (err) { 
                              connection.rollback(function() {
                                //throw err;
                              });
                              return console.log('Error: ' + err);
                            }
                            console.log('Transaction Complete.');
                            connection.end();
                          });

                    });
                })

            });

            
            

            // Save to user_plan_master
            sql = "insert into user_plan_master " +
                "(RecGuid, ProbStatement, CurrentStatus, RiskLevel, FinancialImpact, IsStandardFollowed, SerialNumber)";
            //connection.query()

        })

};


module.exports = {
    saveNewPlan: saveNewPlan
};