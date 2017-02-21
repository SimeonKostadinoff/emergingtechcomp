var server = io(document.location.origin + ':3000');

server.on('connect', function ()
{
	console.log('Requesting user data');
	server.emit('userData');
});

server.on('userData', function (data)
{
	console.log(data);
});