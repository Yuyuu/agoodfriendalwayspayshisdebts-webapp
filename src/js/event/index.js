'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import EventsResource from './resource/events_resource';
import CreateEventController from './controller/create_event_controller';
import routing from './module_routing';

export default angular.module('app.event', [uirouter])
    .config(routing)
    .service('Events', EventsResource)
    .controller('CreateEventController', CreateEventController)
    .name;
