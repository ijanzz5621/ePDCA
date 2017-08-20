var credentials = require('../../credentials');

module.exports = function (app) {

    app.get('/api/users', function (req, res) {
        var blUser = require('../../business-logic/admin/user');
        var data = blUser.getUser().then(function(results){
        
            //console.log("List of users: " + results);
            res.json(results);
        
        }).catch((err) => setImmediate(() => { throw err; }));
    });

    app.get('/api/usersByCompanyAndDepartment', function (req, res) {

        //console.log('Company: ' + req.query.companyCode);

        var blUser = require('../../business-logic/admin/user');
        var data = blUser.getUsersByCompanyAndDepartment(req.query.companyCode, req.query.departmentCode).then(function(results){
        
            res.json(results);
        
        }).catch((err) => setImmediate(() => { throw err; }));
    });

};


        

