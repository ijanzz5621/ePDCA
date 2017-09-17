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

    app.post('/api/plan-get-plandetails', function (req, res) {
        var blPlan = require('../../business-logic/user/plan');

        var planID = req.body.planID;

        blPlan.getPlanDetails(planID)
            .then(function(result){
                res.send(result);
            });
    });

    app.post('/api/plan-rootcause-get_whylist', function (req, res) {
        var blPlan = require('../../business-logic/user/plan');

        var rootcauseId = req.body.rootcauseId;

        //console.log('rootcauseId: ' + req.body.rootcauseId);

        blPlan.getRootcauseWhyList(rootcauseId)
            .then(function(result){
                res.send(result);
            });
    });

    app.post('/api/plan-add-why', function (req, res) {
        var blPlan = require('../../business-logic/user/plan');

        var planID = req.body.planID;
        var rootcauseID = req.body.rootcauseID;
        var why = req.body.why;
        var username = req.session.user;

        blPlan.addWhy(planID, rootcauseID, why, username)
            .then(function(result){
                res.send(result);
            });
    });

    //Plan -> Root cause -> Why comment
    app.post('/api/plan-rootcause-addwhycomment', function (req, res) {
        var blPlan = require('../../business-logic/user/plan');

        var planID = req.body.planID;
        var rootcauseID = req.body.rootcauseID;
        var whyID = req.body.whyID;
        var comment = req.body.comment;
        var userID = req.session.user;
        var username = req.session.username;
        var gender = req.session.gender;

        blPlan.addRootCauseWhyComment(planID, rootcauseID, whyID, comment, userID, username, gender)
            .then(function(result){
                res.send(result);
            });
    });

};