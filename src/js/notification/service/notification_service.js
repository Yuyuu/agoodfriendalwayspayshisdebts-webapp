'use strict';

export default class NotificationService {

  /* @ngInject*/
  constructor(Notification) {
    this._Notification = Notification;
  }

  error(notification) {
    this._Notification.error({title: notification, message: notification});
  }

  success(notification) {
    this._Notification.success({title: notification, message: notification});
  }
}
