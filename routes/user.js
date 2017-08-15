//import controller
var planController = require('../controllers/plan/plan');

var blPlan = require('../business-logic/user/plan');
var lib_mysql = require('../lib/lib_mysql');

module.exports = function (app, auth, db) {

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

        console.log("data posted: " + JSON.stringify(req.body));

        var teams = JSON.parse(req.body.hidTeamMembers);
        /*for (var name in teams){
            console.log(name);
        };*/
        console.log(JSON.stringify(teams));

        //call controller to save plan
        blPlan.saveNewPlan(req.body, db);
        /*var connection = db.connect(db.MODE_PRODUCTION, function(err){
            if (!!err) console.error(err);

        });*/
        /*var connection = lib_mysql.connection;
        connection.query("call sp_GenerateSerialNumber('PDCASerialNumber')", function(error, rows, fields){
            if (!!error) console.error(error);
            console.log(rows);
            console.log(rows[0][0].SerialNumber);
        });*/
        
        res.redirect('/user/plan');
        //next();
    });

    app.get('/user/create', auth, function (req, res) {
        res.render('user/create');
    })
    app.get('/user/action', auth, function (req, res) {
        res.render('user/action');
    })

}