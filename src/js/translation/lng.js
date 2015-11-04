"use strict";

var provider = {
  /* @ngInject */
  $get: function ($cookies) {
    return $cookies.get("i18next").split("-")[0];
  }
};

module.exports = provider;