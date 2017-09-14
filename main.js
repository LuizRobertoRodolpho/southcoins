const request 	= require('request'); 		// requisições
const express 	= require('express');		// routes
const app 		= module.exports = express();
const serv 		= require('http').Server(app);
const port 		= process.env.PORT || 3000;
const path    	= require("path");
const db		= ''; // carregar mongo depois
const bitfinex	= require('bitfinex-api-node');
const socket 	= require('socket.io')(serv,{});
const sockets   = require('./custom_modules/sockets')(socket, db);
const orderBook = require('./custom_modules/bitfinex')(sockets, bitfinex);

try
{
	app.use('/public', express.static(__dirname + '/public'));

	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/client.html'));
	});
	
	serv.listen(port, function () {
		console.log('Aplicação iniciada. Porta: ' + port);
		orderBook.start();
		//ConnectBitfinex();
	});
}
catch (e)
{
	console.log(e);
}