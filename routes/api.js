var express = require('express');
var router = express.Router();
var apicache = require('apicache');

var cache = apicache.middleware;
if(process.env.REDIS_CACHE === '1'){
  cache = require('apicache')
           .options({ redisClient: require('redis').createClient() })
           .middleware;
}

var request = require('request');

router.get('/', cache('5 seconds'), function(req, res, next) {
  res.json({ message: 'API is functioning.', time: + new Date() });
});

router.get('/buses', cache('1 minute'), function(req, res, next) {
  res.json({ message: 'Return a list of buses and times', time: + new Date() });
});

router.get('/weather', cache('5 minutes'), function(req, res, next) {
  request(
    {
      uri: 'https://api.darksky.net/forecast/'+req.darksky_key+'/'+req.lat_long,
      json: true,
      gzip: true
    }, function(error, response, body){
        console.log(response.request.uri);
        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
        if (error && response.statusCode != 200) return next(error);
        res.json(body);
    }
  );
});

module.exports = router;
