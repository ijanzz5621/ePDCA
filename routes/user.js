//import controller
var planController = require('../controllers/plan/plan');

module.exports = function (app, auth) {

    //user site
    app.get('/user/plan', auth, function (req, res) {
        pageTitle = "Plan";

        var result = planController.getAll(function (err, rows) {
            if (err)
                console.log(err);
            else
                console.log(rows);
        });

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