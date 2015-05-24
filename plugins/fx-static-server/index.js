var url = require('url');

var DEFAULT_HOME_URL = '/updating.html';

var homeUrl = DEFAULT_HOME_URL;

module.exports = function(options, imports, register) {
  var argv = options.argv;

  var logger = imports.logger('static-server');
  var express = imports.express;
  var app = imports.webapp;
  var server = imports.server;

  app.use(express.static(__dirname + '/public'));

  // switch home url to parameter home
  app.get('/switch', function(req, res) {
    var query = url.parse(req.url, true).query;

    if (query.page) {
      homeUrl = query.page
    }

    res.end(JSON.stringify({
      code: 200,
      data: homeUrl
    }));
  });

  app.get('/which', function(req, res) {
    res.end(JSON.stringify({
      code: 200,
      data: homeUrl
    }));
  });

  // redirect to homeUrl
  app.use(function(req, res) {
    res.redirect(homeUrl);
  });

  var port = argv.p || 8082;
  server.listen(port);

  logger.info('server started at port', port);

  register();
};