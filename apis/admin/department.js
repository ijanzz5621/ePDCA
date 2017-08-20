var credentials = require('../../credentials');

module.exports = function (app) {

    app.get('/api/departments', function (req, res) {

        var blDept = require('../../business-logic/admin/department');
        var data = blDept.getDepartments().then(function(results){
        
            //console.log("List of departments: " + results);
            res.json(results);
        
        }).catch((err) => setImmediate(() => { throw err; }));
    });

    app.get('/api/departmentsByCompany/:companyCode', function (req, res) {

        var blDept = require('../../business-logic/admin/department');
        var data = blDept.getDepartmentsByCompany(req.params.companyCode).then(function (results) {

            //console.log("List of departments: " + results);
            res.json(results);

        }).catch((err) => setImmediate(() => { throw err; }));
    });

};