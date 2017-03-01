Weathering the CTA
==================

This is a single-page app + node server API that will display the weather, CTA bus times, and other things what have you.

Installing
----------

To install, clone this repo and then build it::

  npm run build

Webpack
~~~~~~~

The `webpack.config.js <webpack.config.js>`_ is defined to both transpile (ES2016+JSX to ES2015) and bundle (include React/ReactDOM minified source) the `main.jsx <src/main.jsx>`_ file and output it in ``dist/main.js`` which is treated as a static directory served by the express application.

Major Dependencies
------------------

- `express <http://expressjs.com/>`_
- `React <https://facebook.github.io/react/>`_
- `webpack <https://webpack.js.org/>`_
- `cta-bus-tracker <https://github.com/projectweekend/Node-CTA-Bus-Tracker>`_
