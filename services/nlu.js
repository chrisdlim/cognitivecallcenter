'use strict';
const {promisify} = require('util');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const nlu = new NaturalLanguageUnderstandingV1({
  // note: if unspecified here, credentials are pulled from environment properties:
  // NATURAL_LANGUAGE_UNDERSTANDING_USERNAME &  NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD
  // username: '<username>'.
  // password: '<password>',
	username: '0df1273d-b4b5-44e6-bf35-549dd327384e',
  password: 'hYO7jQc8iVgr',
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2016_01_23
});

module.exports = function(text, cb) {
	const options = {
		text: text,
		features: {
			concepts: {},
			keywords: {},
			entities: {}
			//sentiment: {}
		}
	};

	nlu.analyze(options, cb);
};
