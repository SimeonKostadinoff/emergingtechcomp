'use strict';

const userController = require('./controller/userController');
const watson = require('watson-developer-cloud');
const express = require('express'); // app server
const expressBrowserify = require('express-browserify');
const bodyParser = require('body-parser'); // parser for post requests
const config = require('./config.js')
const app = express();
const attentionWord = config.attentionWord;

// automatically compile and serve the front-end js
// app.get('/js/speech_to_text.js', expressBrowserify('./public/js/speech_to_text/speech_to_text.js', {
//   watch: process.env.NODE_ENV !== 'production'
// }));

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

// Create the speech ot  text service
const speechToText = new watson.SpeechToTextV1({
  username: config.STTUsername,
  password: config.STTPassword,
  version: 'v1'
});

// Create the conversation service wrapper
const conversation = watson.conversation({
	// If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
	// After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
	username: config.ConUsername,
	password: config.ConPassword,
	url: 'https://gateway.watsonplatform.net/conversation/api',
	version_date: '2017-01-03',
	version: 'v1'
});

// Create the text to speech service wrapper

const textToSpeech = watson.text_to_speech({
	username: config.TTSUsername,
	password: config.TTSPassword,
	version: 'v1'
});

/**
 * Speech to Text
 */

const authService = new watson.AuthorizationV1(speechToText.getCredentials());

// Get token using your credentials
app.get('/api/speech-to-text/token', function(req, res, next) {
  authService.getToken(function(err, token) {
    if (err) {
      next(err);
    } else {
      res.send(token);
    }
  });
});

/**
 * Conversation
 */
app.post('/api/message', function (req, res){
	var workspace = config.ConWorkspace || '<workspace-id>';
	if (!workspace || workspace === '<workspace-id>')
	{
		return res.json({
			'output': {
				'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable.'
			}
		});
	}
	var payload = {
		workspace_id: workspace,
		context: req.body.context || {},
		input: req.body.input || {}
	};

	// Send the input to the conversation service
	conversation.message(payload, function (err, data)
	{
		if (err)
		{
			return res.status(err.code || 500).json(err);
		}
		return res.json(updateMessage(payload, data));
	});
});

/**
 * Text to Speech
 */
app.get('/api/synthesize', (req, res, next) => {
  const transcript = textToSpeech.synthesize(req.query);
  transcript.on('response', (response) => {
    if (req.query.download) {
      if (req.query.accept && req.query.accept === 'audio/wav') {
        response.headers['content-disposition'] = 'attachment; filename=transcript.wav';
      } else {
        response.headers['content-disposition'] = 'attachment; filename=transcript.ogg';
      }
    }
  });
  transcript.on('error', next);
  transcript.pipe(res);
});

app.get('/api/user', userController.getUserData);

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
function updateMessage(input, response){
	var responseText = null;
	if (!response.output)
	{
		response.output = {};
	} else
	{
		return response;
	}
	if (response.intents && response.intents[0])
	{
		var intent = response.intents[0];
		// Depending on the confidence of the response the app can return different messages.
		// The confidence will vary depending on how well the system is trained. The service will always try to assign
		// a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
		// user's intent . In these cases it is usually best to return a disambiguation message
		// ('I did not understand your intent, please rephrase your question', etc..)
		if (intent.confidence >= 0.75)
		{
			responseText = 'I understood your intent was ' + intent.intent;
		} else if (intent.confidence >= 0.5)
		{
			responseText = 'I think your intent was ' + intent.intent;
		} else
		{
			responseText = 'I did not understand your intent';
		}
	}
	response.output.text = responseText;
	return response;
}

module.exports = app;
