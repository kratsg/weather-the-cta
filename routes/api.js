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

// list of API urls for easy reference
var api_ctabus = 'http://www.ctabustracker.com/bustime/api/';
var api_darksky = 'https://api.darksky.net/forecast/';

var cta_bus_api = function(path, qs){
    return function(req, res, next) {
      qs['key'] = req.cta_key;
      qs['format'] = 'json';
      qs['locale'] = 'en';
      request({
          uri: api_ctabus+req.cta_version+path,
          qs: qs,
          json: true,
          gzip: true,
          resolveWithFullResponse: true
      }).then(function(response){
          console.log(response.request.uri);
          console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
          res.json(response.body);
      }).catch(next);
    };
};

router.get('/', cache('5 seconds'), function(req, res, next) {
  res.json({ message: 'API is functioning.', time: + new Date() });
});

router.get('/buses', cache('1 minute'), function(req, res, next) {
  res.json({ message: "Return list of buses" });
});

router.get('/buses/time', cache('1 minute'), cta_bus_api('/gettime', {}));

router.get('/buses/stops/:route_id/:route_direction', /*cache('24 hours'),*/ function(req, res, next) {
  var validDirections = ['Northbound', 'Eastbound', 'Southbound', 'Westbound'];
  var routeDirection = req.params.route_direction.charAt(0).toUpperCase() + req.params.route_direction.slice(1);
  if(validDirections.indexOf(routeDirection) < 0){
    console.error('Route direction must be one of ', validDirections);
    return next(new RangeError('Route direction must be one of ' + validDirections ));
  }
  cta_bus_api('/getstops', {'rt': req.params.route_id, 'dir': routeDirection})(req, res, next);
});

router.get('/weather', cache('5 minutes'), function(req, res, next) {
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
