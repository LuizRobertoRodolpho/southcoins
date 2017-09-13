/* SOCKETS */
module.exports = function (io, db) {
	var module = {};
	var SOCKET_LIST = {};

	var User = function (socket) {
		var self = this;
		self.id = null;
		self.monitoring = false;
		self.socket = socket;
		return self;
	}

	/// Save the user if it is a new
	var setUser = function (uid) {
		db.user.find({id: uid}, function (err,res) {
			if (res.length == 0) {
				db.user.insert({id: uid}, function (err) {
					console.log(err);
				});
			}
		})
	}

	module.SOCKETLIST = function () {
		return SOCKET_LIST; 	
	};

	module.notifyCycle = (uid) => {
		for (var i in SOCKET_LIST){	
			var user = SOCKET_LIST[i];
			if (user.id == uid && user.monitoring === true)
			{
				user.socket.emit('cycleCompleted');
			}
		}
	}

	io.sockets.on('connection', function (socket) {
		socket.id = Math.random();
		SOCKET_LIST[socket.id] = User(socket);

		console.log('connection opened: ' + socket.id);

		socket.on('activate', function(data) {
			SOCKET_LIST[socket.id].id = data.Key;
			SOCKET_LIST[socket.id].monitoring = true;
			console.log('monitor activated');
		});
		socket.on('deactivate', function() {
			/* 	Quando a conexão do usuário é fechada, estamos desativando a flag de monitoramento, 
				mas não deverá ser no futuro, apenas quando o usuário sinalizar via CLIENT, pois
				o sistema de notificações para mobile ou SMS deverão ficar reportando novas ocorrências.
			*/
			SOCKET_LIST[socket.id].monitoring = false;
			console.log('monitor deactivated');
		});
		socket.on('disconnect', function() {
			delete SOCKET_LIST[socket.id];
			console.log('disconnected ' + socket.id);
		});
		socket.on('applyFilter', function(data) {
			if (!isNaN(data.UID))
			{
				setUser(data.UID);
				setFilter(data);
			}
		});
	});

	var pool = setInterval(function() {
		for (var i in SOCKET_LIST){	
			var user = SOCKET_LIST[i];
			if (user.monitoring === true)
			{
				user.socket.emit('pingback', { success: true });
			}
		}
	}, 2000/*1000/25*/);

	return module;
}