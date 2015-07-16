"use strict";

var i18n = require("i18next");

exports.index = function (request, response) {
  response.render("index", {
    title: i18n.t("app.global.title")
  });
};