//import controller
var planController = require('../controllers/plan/plan');
var blPlan = require('../business-logic/user/plan');
var lib_mysql = require('../lib/lib_mysql');
var teamController = require('../business-logic/user/team');

module.exports = function (app, auth) {

    //user site
    app.get('/user/plan', auth, function (req, res) {
        pageTitle = "Plan";

        /*var result = planController.getAll(function (err, rows) {
            if (err)
                console.log(err);
            else
                console.log(rows);
        });*/

        //render plan-submitted page
        res.render('user/plan');
    })

    //Do
    app.get('/user/do', auth, function (req, res) {
        res.render('user/do', { result: "Record save successfully!" });
    })

    app.get('/user/plan-add', auth, function (req, res) {
        res.render('user/plan-add');
    })
    //post
    app.post('/user/plan-add', function(req, res, next){
        //call controller to save plan
        blPlan.saveNewPlan(req.session.user, req.body);
        res.render('user/plan-submitted', { teamleadName: "Sharizan Redzuan" });
    });

    app.get('/user/create', auth, function (req, res) {
        res.render('user/create');
    });
    app.get('/user/action', auth, function (req, res) {
        res.render('user/action');
    });

    //team routers
    app.get('/user/team', auth, function(req, res){
        var personList = [];

        teamController.getTeamMembers(req.session.user)
            .then(function(rows){
                //console.log(result[0].Email);
                
                for (var i = 0; i < rows.length; i++) {
                    var person = {
                        'Username':rows[i].Username,
                        'Gender':rows[i].Gender,
                        'Email':rows[i].Email,
                        'UserCode':rows[i].UserCode,
                        'GroupName': rows[i].GroupName
                    }
                    // Add object into array
                    personList.push(person);
                }
                //console.log(personList);

                res.render('user/team', {teamData: JSON.stringify(personList)});
            })
            .catch(function(err){
                res.render('500', {err: err});
            });

    });

}