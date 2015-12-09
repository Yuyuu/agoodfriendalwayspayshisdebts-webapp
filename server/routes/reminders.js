"use strict";

var jade = require("jade");
var i18n = require("i18next");
var path = require("path");
var configuration = require("../configuration");
var mailgun = require("mailgun-js")({apiKey: configuration.env.emailApiKey, domain: configuration.env.emailApiUrl});

var templateWithModel = jade.compileFile(path.join(__dirname, "../views/emails/reminder.jade"));

exports.send = function send(request, response) {
  var event = request.body.event;
  var recipientVariables = {};
  var recipients = request.body.recipients.map(function (recipient) {
    recipientVariables[recipient.email] = recipient;
    return recipient.email;
  });

  var data = {
    from: configuration.env.emailFrom,
    to: recipients,
    subject: i18n.t("app.reminder.subject") + " [" + event.name + "]",
    html: templateWithModel({t: i18n.t, event: event}),
    "recipient-variables": recipientVariables,
    "v:eventId": event.id,
    "v:participantId": "%recipient.id%"
  };

  mailgun.messages().send(data)
    .then(function () {
      response.status(201).end();
    })
    .catch(function () {
      response.status(503).end();
    });
};
