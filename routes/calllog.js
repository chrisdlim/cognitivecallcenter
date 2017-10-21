const express = require('express');

const {list} = require('../services/cloudant');
const router = express.Router();

router.get('/', function(req, res) {
  list().then((docs) => {
    res.json(docs);
  });
});

module.exports = router;
