//import controller
var planController = require('../controllers/plan/plan');

var blPlan = require('../business-logic/user/plan');
var lib_mysql = require('../lib/lib_mysql');

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
        res.redirect('/user/plan');
    });

    app.get('/user/create', auth, function (req, res) {
        res.render('user/create');
    })
    app.get('/user/action', auth, function (req, res) {
        res.render('user/action');
    })

}