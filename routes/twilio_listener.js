const express = require('express'); 
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const router = express.Router();

router.post('/record', function(req, res) {
    const twiml = new VoiceResponse();
    twiml.say('hello. please leave a message after the beep');

    twiml.record();

    twiml.hangup();

    response.type('text/xml'); 
    response.send(twiml.toString());
});
module.exports = router;
