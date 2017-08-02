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
        res.send("logout success");
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

        req.session.user = username;
        req.session.useraccess = true;

        //save to req locals
        //req.app.locals.username = req.session.user;
        //res.locals.username = req.session.user;

        console.log('username: ' + username + ', password: ' + password);
        res.redirect('/');
    });


}