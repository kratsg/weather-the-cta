var express = require('express');
var router = express.Router();

var cache = require('apicache').middleware;

router.get('/', cache('5 seconds'), function(req, res, next) {
  res.json({ message: 'API is functioning.', time: + new Date() });
});

router.get('/buses', cache('1 minute'), function(req, res, next) {
  res.json({ message: 'Return a list of buses and times', time: + new Date() });
});

router.get('/weather', cache('5 minutes'), function(req, res, next) {
  res.json({ message: 'Return current weather', time: + new Date() });
});

module.exports = router;
