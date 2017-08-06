var credentials = require('../credentials');

module.exports = function (app, authAdmin) {

    //Admin site
    app.get('/admin', authAdmin, function (req, res) {
        res.render('admin/home', { layout: "admin" });
    });

    app.get('/admin/login', function (req, res) {
        res.render('admin/login', { layout: null });
    });

    app.get('/admin/logout', function (req, res) {

        //destroy the session
        req.session.destroy();

        res.redirect('/admin/login');
    });

    app.post('/admin/login', function (req, res) {

        var username = 'admin';
        var password = req.body.txtPassword;

        //Check from database if the user is a valid user
        if (password === credentials.adminPassword){

            //destroy prev session
            //req.session.destroy();
            req.session.user = null;

            req.session.admin = username;
            req.session.isAuthenticated = true;

            //save to req locals
            //req.app.locals.username = req.session.user;
            //res.locals.username = req.session.user;

            console.log('username: ' + username + ', password: ' + password);
            res.redirect('/admin');
            
        } else {
            
            var msg = "Invalid password!";
            res.render('admin/login', { layout: null, message: msg });
            console.log(msg);

        }        
    });

    app.get('/admin/user', authAdmin, function(req, res){ 
        res.render('admin/user', { layout: "admin" });
    });

}