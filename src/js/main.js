'use strict';

import angular from 'angular';
import core from './core';
import notification from './notification';
import event from './event';

angular.module('app', [
  core,
  notification,
  event
]);
