let Otoken = null;

fetchToken();
$('#microphoneIcon').click(function(){
    //handleMicStream(Otoken);
    const beginning = 'Hey! I am Ignis - your virtual personal assistant. Ask me anything you would like to know about your studies.'
    Api.speak(beginning);
});
function handleMicStream(){
    // fetch('/api/speech-to-text/token')
    //     .then(function(response) {
    //         return response.text();
    //     }).then(function (token) {
    //         console.log('Token received!')
            const stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
                token: Otoken,
                continuous: false,
                //outputElement: '#resultsText' // CSS selector or DOM Element
            });
            stream.on('data', handleFormattedMessage).on('end', function(){
                console.log('End')
            }).on('error', function(){
                console.log('Error')
            });

            stream.on('error', function(err) {
                console.log(err);
            });

    //     }).catch(function(error) {
    //         console.log(error);
    // });
}

function handleFormattedMessage(msg) {
    ConversationPanel.sendMessageToWatson(msg.toString());
}

function fetchToken(){
    return fetch('/api/speech-to-text/token').then(res => {
      if (res.status != 200) {
        throw new Error('Error retrieving auth token');
      }
      return res.text();
    }). // todo: throw here if non-200 status
    then(token => {
        console.log('Get token')
        Otoken = token;
    });
}

$('#audio').bind("ended", function(){
    setTimeout(function(){
            console.log('Start new one');
            handleMicStream();
    }, 500);
});
