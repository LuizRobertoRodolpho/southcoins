var request 	= require('request'); 		// requisições
var express 	= require('express');		// routes
var app 		= module.exports = express();
var serv 		= require('http').Server(app);
var port 		= process.env.PORT || 3000;
var path    	= require("path");

try
{
	app.use('/public', express.static(__dirname + '/public'));

	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/client.html'));
	});
	
	serv.listen(port, function () {
		console.log('Aplicação iniciada. Porta: ' + port);
	});
}
catch (e)
{
	console.log(e);
}