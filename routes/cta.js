var express = require('express');
var router = express.Router();

var cache = require('../services/cache');

var request = require('request-promise');

var cta_bus_api = function(path, qs){
    return function(req, res, next) {
      qs['key'] = req.cta_key;
      qs['format'] = 'json';
      qs['locale'] = 'en';
      request({
          uri: 'http://www.ctabustracker.com/bustime/api/'+req.ctabus_version+path,
          qs: qs,
          json: true,
          gzip: true,
          resolveWithFullResponse: true
      }).then(function(response){
          console.log(response.request.uri);
          console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
          res.json(response.body['bustime-response']);
      }).catch(next);
    };
};

// list of stop predictions for stops in environment variables
router.get('/buses', cache('2 minutes'), function(req, res, next){
    if(typeof(req.ctabus_stops) === 'undefined'){
      console.error('Specify a list of (comma-separated) stop ids in CTABUS_STOPS environment variable first.');
      return next(new Error('Specify a list of (comma-separated) stop ids in CTABUS_STOPS environment variable first.'));
    }
    cta_bus_api('/getpredictions', {'stpid': req.ctabus_stops})(req, res, next);
});

// get the current time used by the CTABus API (maybe for sync purposes)
router.get('/buses/time', cache('1 minute'), cta_bus_api('/gettime', {}));

// get a list of routes in the CTABus API
router.get('/buses/routes', cache('1 week'), cta_bus_api('/getroutes', {}));

// get a list of directions for the given route
router.get('/buses/routes/:route_id', cache('1 week'), function(req, res, next){
    cta_bus_api('/getdirections', {rt: req.params.route_id})(req, res, next);
});

// get a list of stops for the given route+direction in the CTABus API
router.get('/buses/stops/:route_id/:route_direction', cache('24 hours'), function(req, res, next) {
  var validDirections = ['Northbound', 'Eastbound', 'Southbound', 'Westbound'];
  var routeDirection = req.params.route_direction.charAt(0).toUpperCase() + req.params.route_direction.slice(1);
  if(validDirections.indexOf(routeDirection) < 0){
    console.error('Route direction must be one of ', validDirections);
    return next(new RangeError('Route direction must be one of ' + validDirections ));
  }
  cta_bus_api('/getstops', {'rt': req.params.route_id, 'dir': routeDirection})(req, res, next);
});

// get a list of predictions for the given stops (comma-separated)
router.get('/buses/predictions/:stop_ids', cache('2 minutes'), function(req, res, next){
  cta_bus_api('/getpredictions', {'stpid': req.params.stop_ids})(req, res, next);
});

module.exports = router;
