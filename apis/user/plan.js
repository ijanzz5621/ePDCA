var credentials = require('../../credentials');

module.exports = function (app) {

    app.post('/api/plan-get-list', function (req, res) {
        var blPlan = require('../../business-logic/user/plan');

        //console.log("data is: " + req.body);

        blPlan.getPlanList(req.session.user, req.body)
            .then(function(result){
                res.send(result);
            });
    });

};