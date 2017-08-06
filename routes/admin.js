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

    app.get('/admin/company', authAdmin, function(req, res){ 
        res.render('admin/company', { layout: "admin" });
    });

    app.get('/admin/department', authAdmin, function(req, res){ 
        res.render('admin/department', { layout: "admin" });
    });

    app.get('/admin/license', authAdmin, function(req, res){ 
        res.render('admin/license', { layout: "admin" });
    });

    app.get('/admin/packages', authAdmin, function(req, res){ 
        res.render('admin/packages', { layout: "admin" });
    });

    app.get('/admin/user', authAdmin, function(req, res){ 
        res.render('admin/user', { layout: "admin" });
    });

    app.post('/admin/user/add-edit-user', function(req, res){

        //read the body
        console.log('Body: ' + JSON.stringify(req.body));
        //console.log('Username: ' + req.body.txtUsername);

        console.log('Code to check: ' + req.body.txtUserCode);

        //gen sql
        var blUser = require('../business-logic/admin/user');
        blUser.getUserByCode(req.body.txtUserCode).then(function(results) {
            //console.log("List of users: " + results);
            console.log('User found: ' + results);

            var sql = "";
            //Check if user already exists, construct update statement, else construct insert statement
            if (results.length > 0)
                //console.log('UPDATE');
                sql = "UPDATE admin_user SET Email = '" + req.body.txtEmail + "' WHERE UserCode = '" + req.body.txtUserCode + "';";
            else
                //console.log('INSERT');
                sql = "";

            blUser.saveUser(sql).then(function(results){
                console.log('Save user result: ' + JSON.stringify(results));
            }).catch((err) => setImmediate(() => { throw err; }));

        }).catch((err) => setImmediate(() => { throw err; }));

        res.redirect('/admin/user');

    })

}