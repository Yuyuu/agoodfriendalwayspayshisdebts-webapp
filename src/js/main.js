'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import event from './event';
import 'angular-bootstrap';
import 'jquery';
import '../less/style.less';

angular.module('app', [event, uirouter, 'ui.bootstrap']);
