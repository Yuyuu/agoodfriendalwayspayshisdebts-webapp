module.exports = {
  "angular": {
    "exports": "angular",
    "depends": {jquery: "jQuery"}
  },
  "angular-resource": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngResource').name"
  },
  "angular-route": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngRoute').name"
  },
  "angular-sanitize": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngSanitize').name"
  },
  "bootstrap": {
    "depends": {
      "jquery": "jQuery"
    }
  },
  "angular-loading-bar": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('angular-loading-bar').name"
  },
  "ng-i18next": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('jm.i18next').name"
  }
};