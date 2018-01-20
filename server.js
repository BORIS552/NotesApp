var express = require('express');
var bodyParser= require('body-parser');
var serverConfig = require('./serverConfig');
var https = require('https');
var fs = require('fs');

var privateKey = fs.readFileSync('./keys/key.pem');
var certificate = fs.readFileSync('./keys/key-cert.pem');
var app = express();
var port = serverConfig.port();
var ip = serverConfig.ipAddr();
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url,{
	useMongoClient: true
});

mongoose.connection.on('error', function(){
	console.log('Could not connect to the database. Exiting now.....' );
	process.exit();
});
mongoose.connection.once('open', function(){
	console.log("Successfully connected to the database");
});


app.get('/', function(req, res){
	res.json({"message":"Welcome to NotesApp"});
});
require('./app/routes/note.routes.js')(app);


https.createServer({
	key: privateKey,
	cert: certificate
}, app).listen(port, ip);