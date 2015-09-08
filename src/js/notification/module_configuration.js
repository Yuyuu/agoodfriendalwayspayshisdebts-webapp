"use strict";

var angular = require("angular");

module.exports = function () {
  angular.module("notification")
    .config(["NotificationProvider", configure]);

  function configure(NotificationProvider) {
    NotificationProvider.setOptions({
      templateUrl: "/templates/notification/default",
      delay: 5000
    });
  }
};