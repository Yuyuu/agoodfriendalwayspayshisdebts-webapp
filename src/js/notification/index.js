"use strict";

var angular = require("angular");
var configureModule = require("./module_configuration");

var notificationModule = angular.module("app.notification", [require("../core")]);

notificationModule
  .service("notificationService", require("./service/notification_service"));

configureModule();

module.exports = notificationModule.name;