"use strict";

var angular = require("angular");

var reminderModule = angular.module("app.event.result.reminder", []);

reminderModule
  .factory("Reminders", require("./resource/reminders_resource"))
  .service("reminderService", require("./service/reminder_service"))
  .controller("ReminderController", require("./controller/reminder_controller"));

module.exports = reminderModule.name;