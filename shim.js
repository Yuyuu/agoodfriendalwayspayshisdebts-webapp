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
  }
};