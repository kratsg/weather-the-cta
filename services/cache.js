var apicache = require('apicache');

var cache = apicache.middleware;
if(process.env.REDIS_CACHE === '1'){
  cache = require('apicache')
           .options({
              redisClient: require('redis').createClient(),
              statusCodes: {
                  include: [200]
              }
            })
           .middleware;
}

module.exports = cache;
