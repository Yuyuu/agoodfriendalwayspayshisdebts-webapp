"use strict";

var angular = require("angular");

var notificationModule = angular.module("notification", []);

notificationModule
  .service("notificationService", require("./service/notification_service"));

module.exports = notificationModule.name;