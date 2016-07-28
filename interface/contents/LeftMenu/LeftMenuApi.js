
// var cli = require('../../../libraries');
var execa = require('execa')

module.exports = function(app) {
  app.get('/api/compile', function(request, response) {
    // cli.initialize()
    Promise.resolve()
      .then(function() {
        // cli.compile();
        return execa.shell('l10ns compile')
      })
      .then(function() {
        return execa.shell('git commit -a -m "localizations"')
      })
      .then(function() {
        return execa.shell('git push')
      })
      .then(function() {
        response.sendStatus(200);
      })
      .catch(function(error) {
        console.error(error)
        response.status(500).send(error.stack);
      });
  });
  app.get('/api/update', function(request, response) {
    Promise.resolve()
      .then(function() {
        return execa.shell('git pull')
      })
      .then(function() {
        return execa.shell('l10ns update')
      })
      .then(function() {
        response.send('ok');
      })
      .catch(function(error) {
        console.error(error)
        response.status(500).send(error.stack);
      });
  });
}
