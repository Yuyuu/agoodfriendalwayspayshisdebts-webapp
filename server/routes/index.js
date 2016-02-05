'use strict';

let bodyParser = require('body-parser');

module.exports = (app) => {
  app.get('/', require('./home').index);
  app.get(/\/templates\/(.*)/, require('./templates').serve);
  require('./api').register(app);
  app.post('/reminders', bodyParser.json(), require('./reminders').send);

  app.get('*', (request, response) => {
    response.redirect('/#/404');
  });
};
