var encryptor = require('../lib/lib_encryptor');
var commonController = require('../lib/dbCommand');

module.exports = function (app, auth) {

    //Login endpoint
    /*app.get('/login', function(req ,res){
        if (!req.query.username || req.query.password){
            res.send('login failed');
        } else if (req.query.username === 'admin' && req.query.password === 'ch@rm1n9'){
            req.session.user = "admin";
            req.session.admin = true;
            res.send('login success!');
        }
    });*/

    //logout endpoint
    app.get('/logout', function (req, res) {
        req.session.destroy();
        //res.send("logout success");
        res.redirect('/login');
    });

    //get content endpoint
    app.get('/content', auth, function (req, res) {
        res.send('You can only see this after you login');
    });

    //default page
    app.get('/', auth, function (req, res) {
        pageTitle = "Home / Dashboard";
        //testscript.testInsert();   
        res.render('home');
    });
    //login page
    app.get('/login', function (req, res) {
        req.session.destroy(); //destroy session if user navigate to login page
        res.render('login', { layout: null });
    });
    app.post('/login', function (req, res) {
        
        var username = req.body.txtUsername;
        var password = req.body.txtPassword;

        //Check from database if the user is a valid user
        if(true){

            //destroy prev session
            //req.session.destroy();
            req.session.admin = null;

            //convert inserted password to hash and compare with database
            var passwordHash = encryptor.generateHashCode(password);

            //Get info from database
            commonController.executeQuery("select * from admin_user where Email = '" + username + "' and Password = '" + passwordHash + "'")
                .then(function(result){
                    if (result.length > 0){

                        req.session.user = username;
                        req.session.username = result[0].Username;
                        req.session.gender = result[0].Gender;
                        req.session.email = result[0].Email;
                        req.session.isAuthenticated = true;

                        //if last login is null, then redirect to change password page
                        if (result[0].LastLogin == null)
                            res.redirect('/accounts/change-password');
                        else {
                            commonController
                            .executeQuery("update admin_user set LastLogin = now() where Email='" + username + "';")
                            .then(function(result){

                                res.redirect('/');

                            });
                        }

                    } 
                    else {
                        res.render('login', { layout: null, returnMessage: "Invalid username or password!" });
                    }
                });

            

        } else {

        }
        
    });


}