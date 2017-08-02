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
    app.get('/user/do', auth, function (req, res) {

        res.render('user/do', { result: "Record save successfully!" });
    })
    app.get('/user/create', auth, function (req, res) {
        res.render('user/create');
    })
    app.get('/user/action', auth, function (req, res) {
        res.render('user/action');
    })

}