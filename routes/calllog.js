const express = require('express');

const {list, searchNaughty} = require('../services/cloudant');
const router = express.Router();

router.get('/', function(req, res) {
  list().then((docs) => {
    res.json(docs);
  });
});

router.get('/naughty', function(req, res) {
  searchNaughty().then((docs) => {
    res.json(docs);
  });
});

module.exports = router;
