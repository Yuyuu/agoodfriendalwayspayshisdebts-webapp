"use strict";

var express = require("express");
var path = require("path");
var configuration = require("./utils/environment_configuration");
var i18n = require("i18next");
var http = require("http");
var serveStatic = require("serve-static");
var morgan = require("morgan");
var ProxyHelper = require("./proxy");
var Router = require("./router");
var revision = require("../revision");

function Server() {
  var app = express();
  var server;

  console.log("Configuring application for environment: " + app.get("env"));

  if ("development" === app.get("env")) {
    app.use(morgan("combined"));
  }

  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "jade");
  app.use(serveStatic(path.join(__dirname, "../public/")));

  revision.initMap(require(configuration.revisionMapPath));
  revision.registerAppHelper(app);

  configureTranslation();

  new ProxyHelper().configure(app);
  new Router().configure(app);

  this.start = function () {
    server = app.listen(port(), function () {
      console.log("Express server listening on port " + this.address().port);
    });
  };

  function port() {
    return configuration.serverPort;
  }

  function configureTranslation() {
    i18n.init({
      ignoreRoutes: ["public/"],
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