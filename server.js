var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var app = express();

// set port to 3000 or whatever heroku (deployment site) sets it to
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

/// bodyparsers 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

// override with POST having ?_method=DELETE or PUT
app.use(methodOverride('_method'));

// Set Handlebars as the default templating engine.
var exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// now import the routes
var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

// Initiate the listener.
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});