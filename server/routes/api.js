"use strict";

var proxyMiddleware = require("http-proxy-middleware");

var configuration = require("../configuration");

module.exports.register = function (app) {
  var apiProxy = proxyMiddleware("/api/**", {
    target: configuration.env.apiUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    }
  });
  app.use(apiProxy);
};
