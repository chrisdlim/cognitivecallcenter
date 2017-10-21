const express = require('express');
const router = express.Router();

router.get('/foobar', function(req, res) {
  res.json({ title: 'Cloudant Boiler Plate' });
});

module.exports = () => router;
