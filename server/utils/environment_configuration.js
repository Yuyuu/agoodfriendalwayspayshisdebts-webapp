"use strict";

var config = require("12factor-config");

module.exports = config({
  serverPort: {
    env: "PORT",
    type: "integer",
    default: 5000
  },
  apiUrl: {
    env: "AGFAPHD_WEBAPP_API_URL",
    type: "string",
    default: "http://localhost:8089"
  },
  revisionMapPath: {
    env: "AGFAPHD_WEBAPP_REVISION_MAP_PATH",
    type: "string",
    default: "../public/default_map.json"
  }
});