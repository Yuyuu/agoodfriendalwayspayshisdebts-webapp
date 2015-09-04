module.exports = {
  "angular": {
    "exports": "angular",
    "depends": {
      jquery: "jQuery"
    }
  },
  "angular-animate": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngAnimate').name"
  },
  "angular-message-format": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngMessageFormat').name"
  },
  "ui.router": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ui.router').name"
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
  "angular-strap": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('mgcrea.ngStrap').name"
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