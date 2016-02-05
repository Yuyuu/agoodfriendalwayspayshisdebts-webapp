'use strict';

let express = require('express');
let path = require('path');
let i18n = require('i18next');
let serveStatic = require('serve-static');
let morgan = require('morgan');
let Revision = require('./revision');
let configuration = require('./configuration');

class Server {
  constructor() {
    this.app = express();
    if (this.app.get('env') === 'development') {
      this.app.use(morgan('combined'));
    }
    i18n.init({
      resGetPath: 'server/locales/__lng__/__ns__.json',
      fallbackLng: 'en',
      detectLngFromHeaders: true
    });
    this.app.use(i18n.handle);
    i18n.serveClientScript(this.app)
        .serveDynamicResources(this.app);
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'jade');
    this.app.use(serveStatic(path.join(__dirname, 'public')));
    this.app.use(serveStatic(path.join(__dirname, '../node_modules/angular-i18n')));
    require('./routes')(this.app);
    new Revision(path.join(__dirname, 'public', 'app', 'map.json'), 'app').register(this.app);
    i18n.registerAppHelper(this.app);
  }

  start() {
    console.log(`Configuring application for environment ${this.app.get('env')}`);
    let port = configuration.env.serverPort || 5000;
    this.app.listen(port, function () {
      console.log('Server listening on port ' + port);
    });
  }
}

module.exports = Server;
