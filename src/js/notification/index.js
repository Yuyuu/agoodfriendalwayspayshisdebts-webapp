"use strict";

var angular = require("angular");
var configureModule = require("./module_configuration");

var notificationModule = angular.module("notification", [require("angular-ui-notification")]);

notificationModule
  .service("notificationService", require("./service/notification_service"));

configureModule();

module.exports = notificationModule.name;