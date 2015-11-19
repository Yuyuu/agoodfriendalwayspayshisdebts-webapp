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
  "angular-cookies": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngCookies').name"
  },
  "angular-loading-bar": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('angular-loading-bar').name"
  },
  "angular-masonry": {
    "depends": {
      "angular": "angular",
      "masonry": "masonry"
    },
    "exports": "angular.module('wu.masonry').name"
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
  "angular-strap-templates": {
    "depends": {
      "angular": "angular"
    }
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
  "masonry": {
    "depends": {
      "jquery": "jQuery"
    },
    "exports": "masonry"
  },
  "moment": "moment",
  "ng-i18next": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('jm.i18next').name"
  },
  "ngInfiniteScroll": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('infinite-scroll').name"
  },
  "underscore": "underscore"
};