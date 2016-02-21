'use strict';

import angular from 'angular';
import ActivityResource from './resource/activity_resource';
import HistoryController from './controller/history_controller';
import ActivityController from './controller/activity_controller';
import routing from './module_routing';

export default angular.module('app.event.activity', [])
  .config(routing)
  .service('Activity', ActivityResource)
  .controller('ActivityController', ActivityController)
  .controller('HistoryController', HistoryController)
  .name;
