var express = require('express');
var router = express.Router();
var apicache = require('apicache');
var cache = require('../services/cache');

var request = require('request-promise');

router.get('/', cache('5 seconds'), function(req, res, next) {
  res.json({ message: 'API is functioning.', time: + new Date() });
});

var cta = require('./cta.js');
router.use('/cta', function(req, res, next){
  req.apicacheGroup = 'cta';
  next();
}, cta);

var weather = require('./weather.js');
router.use('/weather', function(req, res, next){
  req.apicacheGroup = 'weather';
  next();
}, weather);

// add route to display cache index
router.get('/cache/index', function(req, res, next) {
  res.json(apicache.getIndex());
});

// add route to manually clear target/group
router.get('/cache/clear/:target?', function(req, res, next) {
  res.json(apicache.clear(req.params.target));
});


module.exports = router;
