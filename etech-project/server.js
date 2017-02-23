#!/usr/bin/env node
/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var app = require('./server/app'),
	mongoose = require('./server/mongoose'),
	port = process.env.PORT || process.env.VCAP_APP_PORT || 3000,
	server = require('http').createServer(app),
	io = require('socket.io')(server);

server.listen(port, function ()
{
	console.log('Server running on port: %d', port);
	mongoose.init();

	io.on('connection', function (client)
	{
		console.log('Client has connected');

		client.on('userData', function ()
		{
			var user = require('mongoose').model('User');
			user.findOne(function (err, data)
			{
				if (err)
				{
					console.log(err);
					return;
				}
				client.emit('userData', data);
			});
			console.log('User data sent');
		});
	});
});
