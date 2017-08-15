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

            // Generate Serial number
            /*var result = commonFunc.getSerialNumber("", function (err, rows) {
                if (err)
                    console.log(err);
                else
                    console.log("New generated serial number is: " + rows);
            });*/
            planController.getSerialNumber("PDCASerialNumber", function(err, rows){
                if (err)
                    console.log(err);
                else 
                    serialNumber = rows[0][0].SerialNumber;
                    console.log("Serial number is: " + serialNumber);


            });

            // Save to user_plan_master
            sql = "insert into user_plan_master " +
                "(RecGuid, ProbStatement, CurrentStatus, RiskLevel, FinancialImpact, IsStandardFollowed, SerialNumber)";
            //connection.query()

        })

}

module.exports = {
    saveNewPlan: saveNewPlan
};