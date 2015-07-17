"use strict";

var angular = require("angular");

var eventModule = angular.module("event", [require("angular-resource")]);

eventModule
  .factory("Events", require("./resource/events_resource"))
  .controller("CreateEventController", require("./controller/create_event_controller"));

module.exports = eventModule.name;