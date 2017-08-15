var connectionManager = require('../../lib/connectionManager');
var q = require('q');
var uuid = require("uuid");

var commonFunc = require('../../business-logic/general/common');
var planController = require('../../controllers/plan/plan');

function saveNewPlan(data, db){

    var sql = "";
    var deferred = q.defer();

    var serialNumber = "";

    connectionManager.getConnection()
        .then(function(connection){

            // Create plan master rec guid
            var planRecGuid = uuid.v4();
            console.log('random id: ' + planRecGuid);

            // Generate Serial number
            db.connection.query('call sp_GenerateSerialNumber(\'PDCASerialNumber\')', function(err, rows,fields){
                if (err) return console.log('Error: ' + err);
                
                serialNumber = rows[0][0].SerialNumber;
                saveNewPlan = function(){
                    
                };
                
            })
            

            // Save to user_plan_master
            sql = "insert into user_plan_master " +
                "(RecGuid, ProbStatement, CurrentStatus, RiskLevel, FinancialImpact, IsStandardFollowed, SerialNumber)";
            //connection.query()

        })

}

function saveNewPlan(){

}

module.exports = {
    saveNewPlan: saveNewPlan
};