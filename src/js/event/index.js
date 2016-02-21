'use strict';

import angular from 'angular';
import core from '../core';
import expense from '../expense';
import activity from '../activity';
import EventsResource from './resource/events_resource';
import CreateEventController from './controller/create_event_controller';
import EventController from './controller/event_controller';
import routing from './module_routing';

export default angular.module('app.event', [core, expense, activity])
    .config(routing)
    .service('Events', EventsResource)
    .controller('CreateEventController', CreateEventController)
    .controller('EventController', EventController)
    .name;
