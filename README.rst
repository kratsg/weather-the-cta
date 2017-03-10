Weathering the CTA
==================

This is a single-page app + node server API that will display the weather, CTA bus times, and other things what have you.

Installing
----------

To install, clone this repo and then build it::

  npm install
  grunt  # runs grunt webpack sass cssmin

or if you don't have `grunt <https://gruntjs.com>`_ available::

  npm run webpack sass cssmin

Note: I would suggest using ``grunt`` to compile all the ``jsx`` and ``sass`` files. There is a difference between ``cssmin`` from ``npm run`` and from ``grunt cssmin`` that I can't figure out.

Grunt
~~~~~

The `Gruntfile.js <Gruntfile.js>`_ is defined to contain all the tasks that I would normally run to transpile and bundle jsx, compile and minify sass, into a ``dist/`` location. At the moment, there are three commands defined:

- webpack: imports the `webpack.config.js <webpack.config.js>`_ and runs ``webpack``
- sass: uses ``node-sass`` to take ``src/sass`` to ``dist/css``
- cssmin: uses ``cleancss`` to take ``dist/css/*.css``

Webpack
~~~~~~~

The `webpack.config.js <webpack.config.js>`_ is defined to both transpile (ES2016+JSX to ES2015) and bundle (include React/ReactDOM minified source) the `main.jsx <src/main.jsx>`_ file and output it in ``dist/main.js`` which is treated as a static directory served by the express application.

Major Dependencies
------------------

- `express <http://expressjs.com/>`_
- `React <https://facebook.github.io/react/>`_
- `grunt <https://gruntjs.com>`_

  - `webpack <https://webpack.js.org/>`_
  - `node-sass <https://github.com/sass/node-sass>`_
  - `cssmin <https://github.com/gruntjs/grunt-contrib-cssmin>`_

- `cta-bus-tracker <https://github.com/projectweekend/Node-CTA-Bus-Tracker>`_
- (optional) `redis <https://redis.io>`_

Redis is an optional dependency. If you already have a Redis server set up, feel free to switch to API caching using Redis instead of MemoryStore (see `Environment Variables`_ for more information).

Environment Variables
=====================

===================== ======================================================
Variable              Description
--------------------- ------------------------------------------------------
NODE_ENV              Specify ``production`` or ``development``
CTA_KEY               API key for CTA Bus developer access
DARKSKY_KEY           Dark Sky API key (Free: 1000 requests per day)
REDIS_CACHE           API caching using MemoryStore (``0``) or Redis (``1``)
LAT_LONG              "Latitude,Longitude" of location for weather
===================== ======================================================

We support `dotenv <https://github.com/motdotla/dotenv>`_. The best way to set these environment variables is to create a ``.env`` file in the same directory as this `README.rst <README.rst>`_ file and add a new key/value pair on each line.
