"use strict";

var express = require("express");
var path = require("path");
var i18n = require("i18next");
var serveStatic = require("serve-static");
var morgan = require("morgan");

var configuration = require("./configuration");

function Server() {
  var app = express();
  var server;

  console.log("Configuring application for environment: " + app.get("env"));

  if ("development" === app.get("env")) {
    app.use(morgan("combined"));
  }

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");
  app.use(serveStatic(path.join(__dirname, "public")));

  configureTranslation();
  require("./routes")(app);

  require("./revision").register(configuration.env.revisionMapPath, app);

  this.start = function () {
    server = app.listen(port(), function () {
      console.log("Express server listening on port " + this.address().port);
    });
  };

  function port() {
    return configuration.env.serverPort;
  }

  function configureTranslation() {
    i18n.init({
      resGetPath: "server/locales/__lng__/__ns__.json",
      fallbackLng: "en",
      detectLngFromHeaders: true
    });

    app.use(i18n.handle);
    i18n.serveClientScript(app)
      .serveDynamicResources(app)
      .registerAppHelper(app);
  }
}

module.exports = Server;