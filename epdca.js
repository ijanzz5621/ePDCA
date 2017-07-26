var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

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

//default page
app.get('/', function(req, res){
    res.render('home');
})

//login page
app.get('/login', function(req, res){
    res.render('login', {layout: null});
});



app.listen(app.get('port'), function(){
    console.log("ePDCA running at port " + app.get('port') + "....");
});

