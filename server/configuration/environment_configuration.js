"use strict";

var config = require("12factor-config");

var appConfig = config({
  apiUrl: {
    env: "AGFAPHD_WEBAPP_API_URL",
    type: "string",
    default: "http://localhost:8089"
  },
  emailApiKey: {
    env: "AGFAPHD_WEBAPP_EMAIL_API_KEY",
    type: "string",
    required: true
  },
  emailApiUrl: {
    env: "AGFAPHD_WEBAPP_EMAIL_API_URL",
    type: "string",
    default: "sandboxa92275a42f30470c860fda4a09140bf6.mailgun.org"
  },
  emailFrom: {
    env: "AGFAPHD_WEBAPP_EMAIL_FROM",
    type: "string",
    default: "Debt Sentry <sentry@agoodfriendalwayspayshisdebts.com>"
  },
  revisionMapPath: {
    env: "AGFAPHD_WEBAPP_REVISION_MAP_PATH",
    type: "string",
    default: "../public/default_map.json"
  },
  serverPort: {
    env: "PORT",
    type: "integer",
    default: 5000
  }
});

module.exports = appConfig;