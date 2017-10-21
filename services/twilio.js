const twilio = require('twilio');
const cred = require('./credentials').twilio;

const client = new twilio(cred.accountSID, cred.authToken);
module.exports.getRecordings = function() {
	client.recordings.each(recording => console.log(recording.duration));
};
