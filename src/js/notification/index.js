'use strict';

import angular from 'angular';
import core from '../core';
import NotificationService from './service/notification_service';
import configuration from './module_configuration';

export default angular.module('app.notification', [core])
  .config(configuration)
  .service('notificationService', NotificationService)
  .name;
