"use strict";

/* @ngInject */
function NotificationService(Notification) {
  this.error = displayErrorNotification;
  this.success = displaySuccessNotification;

  function displayErrorNotification(notification) {
    Notification.error(options(notification));
  }

  function displaySuccessNotification(notification) {
    Notification.success(options(notification));
  }

  function options(notification) {
    return {title: notification, message: notification};
  }
}

module.exports = NotificationService;