var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

//database
var db = require('./lib/db');

//*********
//variables
//********* 
var pageTitle = "";

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

//session store
var MySQLStore = require('express-mysql-session')(session); 
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ch@rm1n9',
    database: 'session_epdca',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    },
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds. 
    expiration: 86400000,// The maximum age of a valid session; milliseconds. 
    createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist. 
    connectionLimit: 1,// Number of connections when creating a connection pool 
};
 
var sessionStore = new MySQLStore(options);
 
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

//session
/*app.use(session({
    secret: 'ch@rm1n9'
    , resave : true
    , saveUninitialized: true
}));*/

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

//***************************************** */
//Authentication and authorization middleware
//***************************************** */
var auth = function (req, res, next) {
    //if (req.session && req.session.user === 'admin' && req.session.admin)
    if (req.session && req.session.user)
        return next();
    else
        //return res.sendStatus(401);
        return res.redirect('/login');
};
var authAdmin = function (req, res, next) {
    if (req.session && req.session.user === 'admin' && req.session.admin)
        return next();
    else
        //return res.sendStatus(401);
        return res.redirect('admin/login');
};

//middleware to pass data to page
app.use(function(req, res, next){
    res.locals.username = req.session.user;
    next();
})

//********************* */
// ROUTING
//********************* */
//import main routes
require('./routes/main')(app, auth);
//import user routes
require('./routes/user')(app, auth);
//import admin routes
require('./routes/admin')(app, authAdmin);

//******************* */
//INIT and START server
//******************* */

function startServer() {
    // Connect to MySQL on start
    db.connect(db.MODE_PRODUCTION, function (err) {
        if (err) {
            console.log('Unable to connect to MySQL.')
            process.exit(1)
        } else {
            //start the server
            app.listen(app.get('port'), function () {
                console.log("ePDCA running at port " + app.get('port') + "....");
            });
        }
    })
}

if (require.main === module){
    startServer();
} else 
{
    module.exports = startServer;
}



