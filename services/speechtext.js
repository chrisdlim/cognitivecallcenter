const watson = require('watson-developer-cloud');
const cred = require('./credentials')['speech_to_text'];

const stt = new watson.SpeechToTextV1({
  // if left undefined, username and password to fall back to the SPEECH_TO_TEXT_USERNAME and
  // SPEECH_TO_TEXT_PASSWORD environment properties, and then to VCAP_SERVICES (on Bluemix)
  username: cred.username,
  password: cred.password
});

const authService = new watson.AuthorizationV1(stt.getCredentials());

const DEFAULT_PARAMS = {
  model: 'en-US_BroadbandModel',
  content_type: 'audio/flac',
  'interim_results': false,
  'max_alternatives': 3,
  'word_confidence': false,
  timestamps: false,
  keywords: ['colorado', 'tornado', 'tornadoes'],
  'keywords_threshold': 0.5
};

/**
 * Transcribes
 *
 * input = input stream
 * param_override = key value pairs to override default params
 * cb = standard node callback accepting (err, data) where data is a buffer for
 *      the transcription
 *
 * Returns the recognize stream which has an output that can be piped and is an
 * event emitter
 */
function transcribe(input, param_override, cb) {
  const params = Object.assign({}, DEFAULT_PARAMS, param_override);

  const recognizeStream = stt.createRecognizeStream(params);
  recognizeStream.setEncoding('utf8');
  input.pipe(recognizeStream);

  recognizeStream.on('data', (event) => {
    cb(null, event);
  });

  recognizeStream.on('error', (event) => {
    cb(event, null);
  });

  return recognizeStream;
}

module.exports.transcribe = transcribe;
module.exports._demo = function() {
  let input = fs.createReadStream('audio-file.flac');
  let params = {
    content_type: 'audio/flac',
    keywords: ['colorado', 'tornado', 'tornadoes']
  };

  transcribe(input, params, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(data.toString('utf8'));
  });
};
