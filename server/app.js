var http = require('http'),
	path = require('path'),
	express = require('express'),
	requireJS = require('requirejs'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	router = require('./router');

mongoose.connect(process.env.DB_PATH);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connect error:'));
db.once('open', console.log.bind(console,'\nMongoDB Connected: ', process.env.DB_PATH));

var app = express();

requireJS.config({
	nodeRequire: require
});

app.use(bodyParser.json());

router.handleRoutes(app);

app.set('port', 8080);
app.set('case sensitive routing', false);

app.use('/js', express.static(path.join(__dirname, '../www/js')));
app.use('/css', express.static(path.join(__dirname, '../www/css')));

var server = app.listen(process.env.PORT || app.get('port'), function(){
	console.log("Server has been started at " + server.address().port);
});