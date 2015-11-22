"use strict";

var angular = require("angular");

var ngStrapSelectModule = require("angular-strap") + ".select";

var remindersModule = angular.module("app.event.history", [ngStrapSelectModule]);

remindersModule
  .factory("History", require("./resource/history_resource"))
  .controller("HistoryController", require("./controller/history_controller"));

module.exports = remindersModule.name;