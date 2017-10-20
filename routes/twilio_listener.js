const express = require('express'); 
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const router = express.Router();

router.use(urlencoded({extended: false}));

router.post('/record', function(req, res) {
    const twiml = new VoiceResponse();
    twiml.say('hello. please leave a message after the beep');

    twiml.record();

    twiml.hangup();

    response.type('text/xml'); 
    response.send(twiml.toString());
});

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (request, response) => {
    // Get information about the incoming call, like the city associated
    // with the phone number (if Twilio can discover it)
    const city = request.body.FromCity;
  
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
    twiml.say({voice: 'alice'},
      `Never gonna give you up ${city}.`
    );
    twiml.play({}, 'https://demo.twilio.com/docs/classic.mp3');
  
    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
  });

module.exports = router;

