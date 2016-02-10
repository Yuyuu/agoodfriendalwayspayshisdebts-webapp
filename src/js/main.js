'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import event from './event';
import 'angular-bootstrap';
import 'jquery';
import '../../node_modules/font-awesome/fonts/fontawesome-webfont.woff';
import '../less/style.less';

angular.module('app', [event, uirouter, 'ui.bootstrap']);
