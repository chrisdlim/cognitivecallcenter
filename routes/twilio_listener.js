const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

const router = express.Router();

router.use(urlencoded({extended: false}));

router.post('/record', function(req, res) {
    const twiml = new VoiceResponse();
    twiml.say('hello. please leave a message after the beep.\press the star key when finished.');

    twiml.record({
    	timeout: 5,
        transcribe: false,
        recordingStatusCallback: '/handleRecording',
        maxLength: 20
    });

    twiml.hangup();

    res.type('text/xml');
    console.log(twiml.toString());
    console.log(JSON.stringify(req));
    res.send(twiml.toString());
});
router.post('/handleRecording', function(req, res) {
   console.log(JSON.stringify(req)); 
});

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
router.post('/voice', function(req, res) {
    // Get information about the incoming call, like the city associated
    // with the phone number (if Twilio can discover it)
    const city = req.body.FromCity;
  
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
    twiml.say({voice: 'alice'},
      `Never gonna give you up ${city}.`
    );
    twiml.play({}, 'https://demo.twilio.com/docs/classic.mp3');
  
    // Render the response as XML in reply to the webhook request
    res.type('text/xml');
    res.send(twiml.toString());
  });

module.exports = router;

