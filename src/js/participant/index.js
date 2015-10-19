"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var participantModule = angular.module("app.event.participant", []);

participantModule
  .factory("Participants", require("./resource/participants_resource"))
  .controller("ParticipantsController", require("./controller/participants_controller"))
  .controller("EditParticipantController", require("./controller/edit_participant_controller"))
  .directive("debtsAvatar", require("./directive/avatar_directive"));

configureModuleRouting();

module.exports = participantModule.name;