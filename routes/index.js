"use strict";

var bodyParser = require("body-parser");

var homeRoute = require("./home");
var templatesRoute = require("./templates");
var remindersRoute = require("./reminders");

module.exports = function (app) {
  app.get("/", homeRoute.index);
  app.get(/^\/templates\/(.*)$/, templatesRoute.serve);
  app.post("/reminders", bodyParser.json(), remindersRoute.send);

  app.get("*", function (request, response) {
    response.redirect("/#/404");
  });
};