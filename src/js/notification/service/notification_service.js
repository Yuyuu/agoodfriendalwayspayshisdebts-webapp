"use strict";

/* @ngInject */
function NotificationService(Notification) {
  this.success = displaySuccessNotification;

  function displaySuccessNotification(notification) {
    Notification.success(options(notification));
  }

  function options(notification) {
    return {title: notification, message: notification};
  }
}

module.exports = NotificationService;