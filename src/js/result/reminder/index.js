"use strict";

var angular = require("angular");

var ngStrapSelectModule = require("angular-strap") + ".select";

var reminderModule = angular.module("app.event.result.reminder", [ngStrapSelectModule]);

reminderModule
  .factory("Reminders", require("./resource/reminders_resource"))
  .service("reminderService", require("./service/reminder_service"))
  .controller("ReminderController", require("./controller/reminder_controller"));

module.exports = reminderModule.name;