var credentials = require('../../credentials');

module.exports = function (app) {

    app.get('/api/companies', function (req, res) {
        var blCompany = require('../../business-logic/admin/company');
        var data = blCompany.getCompanies().then(function(results){
        
            console.log("List of companies: " + results);
            res.json(results);
        
        }).catch((err) => setImmediate(() => { throw err; }));
    });

};