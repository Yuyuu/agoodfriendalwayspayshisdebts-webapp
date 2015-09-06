"use strict";

var angular = require("angular");

var ngStrapAlertModule = require("angular-strap") + ".alert";

var notificationModule = angular.module("notification", [ngStrapAlertModule]);

notificationModule
  .service("notificationService", require("./service/notification_service"));

module.exports = notificationModule.name;