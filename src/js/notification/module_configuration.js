'use strict';

/* @ngInject */
export default function (NotificationProvider) {
  NotificationProvider.setOptions({
    templateUrl: '/templates/notification/default',
    delay: 5000
  });
}
