var credentials = require('../../credentials');

module.exports = function (app) {

    app.post('/api/plan-get-list', function (req, res) {
        var blPlan = require('../../business-logic/user/plan');

        blPlan.getPlanList(req.session.user, req.body)
            .then(function(result){
                res.send(result);
            });
    });

    app.post('/api/plan-get-rootcause', function (req, res) {
        var blPlan = require('../../business-logic/user/plan');

        var planID = req.body.planID;

        blPlan.getRootcauseList(planID)
            .then(function(result){
                res.send(result);
            });
    });

    app.post('/api/plan-add-rootcause', function (req, res) {
        var blPlan = require('../../business-logic/user/plan');

        var planID = req.body.planID;
        var title = req.body.title;
        var desc = req.body. desc;
        var username = req.session.user;

        blPlan.addRootCause(planID, username, title, desc)
            .then(function(result){
                res.send(result);
            });
    });

};