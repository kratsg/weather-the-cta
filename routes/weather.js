var router = require('express').Router();
var apicache = require('apicache');

var cache = apicache.middleware;
if(process.env.REDIS_CACHE === '1'){
  cache = require('apicache')
           .options({ redisClient: require('redis').createClient() })
           .middleware;
}

var request = require('request-promise');

// list of API urls for easy reference
var api_darksky = 'https://api.darksky.net/forecast/';

router.get('/', cache('5 minutes'), function(req, res, next) {
  request({
      uri: api_darksky+req.darksky_key+'/'+req.lat_long,
      json: true,
      gzip: true,
      resolveWithFullResponse: true
  }).then(function(response){
      console.log(response.request.uri);
      console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
      res.json(response.body);
  }).catch(next);
});

module.exports = router;
