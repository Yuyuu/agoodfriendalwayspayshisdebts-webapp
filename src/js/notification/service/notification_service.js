"use strict";

/* @ngInject */
function NotificationService($alert) {
  this.success = displaySuccessNotification;

  var alertOptions = {
    templateUrl: "/templates/alert/strap_alert",
    placement: "top-right",
    duration: 5,
    container: "body",
    dismissable: false,
    show: true
  };

  function displaySuccessNotification(notification) {
    alertOptions.type = "success";
    alertOptions.title = notification + ".title";
    alertOptions.content = notification + ".content";
    $alert(alertOptions);
  }
}

module.exports = NotificationService;