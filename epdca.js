var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

//database
var db = require('./lib/db');

//credentials
var credentials = require('./credentials');

//*********
//variables
//********* 
var pageTitle = "";

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

//session store
require('./lib/session-store')(app, session);

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
    next();
});

//***************************************** */
//Authentication and authorization middleware
//***************************************** */
var auth = function (req, res, next) {
    if (req.session && req.session.user && req.session.isAuthenticated)
        return next();
    else
        return res.redirect('/login');
};
var authAdmin = function (req, res, next) {
    if (req.session && req.session.admin === 'admin' && req.session.isAuthenticated)
        return next();
    else
        return res.redirect('admin/login');
};

//middleware to pass data to page
app.use(function(req, res, next){
    res.locals.username = req.session.user || req.session.admin;
    next();
})

//********************* */
// ROUTING
//********************* */
require('./routes/account')(app, auth);
require('./routes/main')(app, auth);
require('./routes/user')(app, auth);
require('./routes/admin')(app, authAdmin);

//********************* */
// API
//********************* */
require('./apis/admin/company')(app);
require('./apis/admin/department')(app);
require('./apis/admin/user')(app);
require('./apis/user/team')(app);
require('./apis/user/plan')(app);

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



