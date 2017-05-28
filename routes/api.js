var express = require('express');
var router = express.Router();
var apicache = require('apicache');

var cache = apicache.middleware;
if(process.env.REDIS_CACHE === '1'){
  cache = require('apicache')
           .options({ redisClient: require('redis').createClient() })
           .middleware;
}

var request = require('request-promise');

router.get('/', cache('5 seconds'), function(req, res, next) {
  res.json({ message: 'API is functioning.', time: + new Date() });
});

var cta = require('./cta.js');
router.use('/cta', cta);

var weather = require('./weather.js');
router.use('/weather', weather);

module.exports = router;
