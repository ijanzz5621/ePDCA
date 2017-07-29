var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

//session
app.use(session({
    secret: 'ch@rm1n9'
    , resave : true
    , saveUninitialized: true
}));

//set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main'
        , helpers: {
            section: function(name, options){
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//set port
app.set('port', process.env.PORT || 8080);

//expose static files
app.use(express.static(__dirname + '/public'));

//set partial view
app.use(function(req, res, next){
    if (!res.locals.partials)
        res.locals.partials = {};
    //Add all partial view here
    //res.locals.partials.weather = weather.getWeatherData();
    next();
});

//Authentication and authorization middleware
var auth = function(req, res, next){
    //if (req.session && req.session.user === 'admin' && req.session.admin)
   if (req.session && req.session.user)
        return next();
    else
        //return res.sendStatus(401);
        return res.redirect('/login');
};

var authAdmin = function(req, res, next){
    if (req.session && req.session.user === 'admin' && req.session.admin)   
        return next();
    else
        //return res.sendStatus(401);
        return res.redirect('admin/login');
};

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
app.get('/logout', function(req, res){
    req.session.destroy();
    res.send("logout success");
});

//get content endpoint
app.get('/content', auth, function(req, res){
    res.send('You can only see this after you login');
});

//default page
app.get('/', auth, function(req, res){
    res.render('home');
});
//login page
app.get('/login', function(req, res){
    res.render('login', {layout: null});
});
app.post('/login', function(req, res){

    var username = req.body.txtUsername;
    var password = req.body.txtPassword;

    //Check from database if the user is a valid user

    req.session.user = username;
    req.session.user = true;

    console.log('username: ' + username + ', password: ' + password);
    res.redirect('/');
});


//Admin site
app.get('/admin', authAdmin, function(req, res){
    res.render('admin/home', { layout: "admin" });
});
app.get('/admin/login', function(req, res){
    res.render('admin/login', { layout: null });
});

//user site
app.get('/user/plan', auth, function(req, res){
    res.render('user/plan');
})
app.get('/user/do', auth, function(req, res){
    res.render('user/do');
})
app.get('/user/create', auth, function(req, res){
    res.render('user/create');
})
app.get('/user/action', auth, function(req, res){
    res.render('user/action');
})



//-------------------------------------------------------------

//start the server
app.listen(app.get('port'), function(){
    console.log("ePDCA running at port " + app.get('port') + "....");
});

