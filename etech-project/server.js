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

let app = require('./server/app'),
	mongoose = require('mongoose'),
	port = process.env.PORT || process.env.VCAP_APP_PORT || 3000,
	server = require('http').createServer(app);

server.listen(port, function ()
{
	console.log('Server running on port: %d', port);

	mongoose.connect('mongodb://etech_team:etechteam2016@ds035059.mlab.com:35059/etechproject');
	let db = mongoose.connection;

	db.once('open', function (err)
	{
		if (err)
		{
			console.log('Could not connect to the database! ' + err);
			return;
		}
		console.log('Connected to the database');
	});

	db.on('error', function (err)
	{
		console.log('Database error: ' + err);
	});
});
