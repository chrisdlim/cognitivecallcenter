const watson = require('watson-developer-cloud');
const cred = require('./credentials')['speech_to_text'];

const stt = new watson.SpeechToTextV1({
  // if left undefined, username and password to fall back to the SPEECH_TO_TEXT_USERNAME and
  // SPEECH_TO_TEXT_PASSWORD environment properties, and then to VCAP_SERVICES (on Bluemix)
  username: cred.username,
  password: cred.password
});

const authService = new watson.AuthorizationV1(stt.getCredentials());

const params = {
  model: 'en-US_BroadbandModel',
  content_type: 'audio/flac',
  'interim_results': false,
  'max_alternatives': 3,
  'word_confidence': false,
  timestamps: false,
  keywords: ['colorado', 'tornado', 'tornadoes'],
  'keywords_threshold': 0.5
};

var recognizeStream = stt.createRecognizeStream(params);

fs.createReadStream('audio-file.flac').pipe(recognizeStream);
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
recognizeStream.setEncoding('utf8');

// Listen for events.
//recognizeStream.on('results', function(event) { onEvent('Results:', event); });
recognizeStream.on('data', function(event) { onEvent('Data:', event); });
//recognizeStream.on('error', function(event) { onEvent('Error:', event); });
//recognizeStream.on('close', function(event) { onEvent('Close:', event); });
//recognizeStream.on('speaker_labels', function(event) { onEvent('Speaker_Labels:', event); });

// Displays events on the console.
function onEvent(name, event) {
  console.log(name, JSON.stringify(event, null, 2));
};

module.exports = function() {};
