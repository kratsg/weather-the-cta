var express = require('express');
var router = express.Router();
var apicache = require('apicache');

var cache = apicache.middleware;
if(process.env.REDIS_CACHE === '1'){
  cache = require('apicache')
           .options({ redisClient: require('redis').createClient() })
           .middleware;
}

router.get('/', cache('5 seconds'), function(req, res, next) {
  res.json({ message: 'API is functioning.', time: + new Date() });
});

router.get('/buses', cache('1 minute'), function(req, res, next) {
  res.json({ message: 'Return a list of buses and times', time: + new Date() });
});

router.get('/weather', cache('10 minutes'), function(req, res, next) {
  res.json({ message: 'Return current weather', time: + new Date() });
});

module.exports = router;
