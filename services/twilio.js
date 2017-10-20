const twilio = require('twilio');
const cred = require('./credentials').twilio;

module.exports = function() {
  let client = new twilio(accountSID, authToken);
};
