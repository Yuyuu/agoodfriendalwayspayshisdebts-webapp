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
  "angular-bootstrap": {
    "depends": {
      "angular": "angular",
      "bootstrap": null
    },
    "exports": "angular.module('ui.bootstrap').name"
  },
  "angular-loading-bar": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('angular-loading-bar').name"
  },
  "angular-message-format": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngMessageFormat').name"
  },
  "angular-sanitize": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngSanitize').name"
  },
  "angular-strap": {
    "depends": {
      "angular": "angular",
      "bootstrap": null
    },
    "exports": "angular.module('mgcrea.ngStrap').name"
  },
  "angular-ui-notification": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ui-notification').name"
  },
  "angular-ui-router": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ui.router').name"
  },
  "bootstrap": {
    "depends": {
      "jquery": "jQuery"
    }
  },
  "ng-i18next": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('jm.i18next').name"
  }
};