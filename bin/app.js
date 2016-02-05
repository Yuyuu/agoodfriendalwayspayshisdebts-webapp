'use strict';

var Server = require('../server/server');

class App {
  static run() {
    new Server().start();
  }
}

if (require.main === module) {
  App.run();
}

module.exports = App;
