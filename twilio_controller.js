const express = require('express');
const app = express();

app.get('/audio', function(req, res) {
	res.send('Hello World!');
});

app.listen(9000, function() {
	console.log('Example app listening on port 9000!');
});
