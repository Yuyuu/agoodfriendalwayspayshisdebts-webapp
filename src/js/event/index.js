"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var eventModule = angular.module("app.event", [require("../expense"), require("../participant"), require("../result")]);

eventModule
  .factory("Events", require("./resource/events_resource"))
  .controller("CreateEventController", require("./controller/create_event_controller"))
  .controller("ShowEventController", require("./controller/show_event_controller"))
  .controller("AddParticipantController", require("./controller/add_participant_controller"));

configureModuleRouting();

module.exports = eventModule.name;