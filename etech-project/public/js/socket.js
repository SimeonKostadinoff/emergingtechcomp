var server = io('http://localhost:3000');

server.on('connect', function ()
{
	server.emit('userData');
	console.log('Requesting user data');
});

server.on('userData', function (data)
{
	console.log(data);
});