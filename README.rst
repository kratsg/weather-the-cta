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
---------------------

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

Auto-running
============

Forever
-------

Foreverjs is a ridiculously simple tool to ensure that your node server runs... forever. We provide a `forever.config.json <forever.config.json>`_ file that should suit most needs and can be run like::

  forever start ./forever.config.json

In particular, I don't watch for changes since my main use is to put this on a raspberry pi. This means if I want to update it, I just power-cycle and my auto-start script will grab changes and start up the server again with ``forever``. See `Raspberry Pi 3`_ for more information.

Raspberry Pi 3
--------------

An executable ``startup.sh`` script could be written to automatically pull changes, prune packages, install new packages, run grunt, and start a server. An example of such a scrip is provided below for posterity::

  #!/bin/bash
  sleep 8
  # this loads nvm
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  nvm use v5.5.0
  cd /home/pi/weather-the-cta
  /usr/bin/git pull
  npm prune
  npm install
  grunt
  forever cleanlogs # only if you want to clear all historical logs in case they get huge
  forever start ./forever.config.json

This startup script can be executed from ``/home/pi/.config/lxsession/LXDE-pi/autostart``::

  @lxpanel --profile LXDE-pi
  @pcmanfm --desktop --profile LXDE-pi
  #@xscreensaver -no-splash  # disable screensaver by commenting out
  @point-rpi
  # stop X11 from turning off automatically
  @xset s off
  @xset -dpms
  @xset s noblank
  @./startup.sh
  @chromium-browser --incognito --kiosk 0.0.0.0:3000

which looks like this for me right now. The log file when this runs on startup is located at ``/home/pi/.cache/lxsession/LXDE-pi/run.log``.
